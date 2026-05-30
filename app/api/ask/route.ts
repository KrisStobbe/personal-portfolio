import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { ASK_SYSTEM_PROMPT } from './system-prompt'

/** Force the Node.js runtime so we can use the Anthropic SDK and timers. */
export const runtime = 'nodejs'

/**
 * One turn of the chat exchange sent to the Anthropic API.
 */
interface AskMessage {
  /** Author of the message. */
  role: 'user' | 'assistant'
  /** Message text. Truncated server-side to {@link MAX_USER_CHARS}. */
  content: string
}

/**
 * JSON body expected by `POST /api/ask`.
 */
interface AskRequestBody {
  /** Conversation history, oldest → newest. The last entry must be from the user. */
  messages: AskMessage[]
}

/** Maximum number of past messages forwarded to the model. */
const MAX_MESSAGES = 20
/** Maximum number of characters allowed per message after truncation. */
const MAX_USER_CHARS = 500
/** Maximum requests an IP may make per {@link RATE_WINDOW_MS}. */
const RATE_LIMIT = 20
/** Sliding window (ms) used by the in-memory rate limiter. */
const RATE_WINDOW_MS = 5 * 60_000

/**
 * In-memory rate-limit ledger keyed by client IP. Values are timestamps
 * of recent requests; old entries are evicted opportunistically by
 * {@link rateLimited}.
 *
 * NOTE: Single-process only; not safe for multi-instance deployments.
 */
const hits = new Map<string, number[]>()

/**
 * Records a request from the given IP and returns whether it should be
 * rate-limited. Also opportunistically prunes the ledger when it grows
 * large to keep memory bounded.
 *
 * @param ip - Client IP address.
 * @returns `true` if the request exceeds the rate limit.
 */
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = hits.get(ip) ?? []
  const recent = arr.filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(k)
    }
  }
  return recent.length > RATE_LIMIT
}

/**
 * `POST /api/ask` — proxies a chat exchange to the Anthropic Messages API
 * and streams the assistant's reply back as `text/plain`.
 *
 * Responsibilities:
 * - 503 if the server is missing `ANTHROPIC_API_KEY`.
 * - 429 if the requesting IP has exceeded the rate limit.
 * - 400 on malformed or empty input.
 * - Otherwise opens a streaming response that pipes Anthropic deltas to
 *   the client as raw text. Errors mid-stream are surfaced inline as
 *   `[error: ...]` so the client can display them gracefully.
 *
 * @param req - The incoming Next.js request.
 * @returns A streaming text response or a JSON error response.
 */
export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          'The Ask widget is not configured. Set ANTHROPIC_API_KEY in .env.local and restart the dev server.',
      }),
      { status: 503, headers: { 'content-type': 'application/json' } },
    )
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  if (rateLimited(ip)) {
    return new Response(
      JSON.stringify({
        error: 'Too many messages in a short window. Try again in a few minutes.',
      }),
      { status: 429, headers: { 'content-type': 'application/json' } },
    )
  }

  let body: AskRequestBody
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response(JSON.stringify({ error: 'Missing messages.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const trimmed = body.messages.slice(-MAX_MESSAGES).map((m) => ({
    role: m.role,
    content: String(m.content || '').slice(0, MAX_USER_CHARS),
  }))

  const last = trimmed[trimmed.length - 1]
  if (last?.role !== 'user') {
    return new Response(
      JSON.stringify({ error: 'Last message must be from the user.' }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    )
  }
  if (!last.content.trim()) {
    return new Response(
      JSON.stringify({ error: 'Message is empty.' }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    )
  }

  const client = new Anthropic()

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = client.messages.stream({
          model: 'claude-haiku-4-5',
          max_tokens: 400,
          system: [
            {
              type: 'text',
              text: ASK_SYSTEM_PROMPT,
              cache_control: { type: 'ephemeral' },
            },
          ],
          messages: trimmed,
        })

        messageStream.on('text', (delta) => {
          controller.enqueue(encoder.encode(delta))
        })

        await messageStream.finalMessage()
        controller.close()
      } catch (err) {
        const msg =
          err instanceof Anthropic.APIError
            ? `Anthropic error ${err.status}: ${err.message}`
            : err instanceof Error
              ? err.message
              : 'Unknown error'
        controller.enqueue(encoder.encode(`\n\n[error: ${msg}]`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}
