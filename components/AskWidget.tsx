'use client'

import React, { useEffect, useRef, useState } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  'What did Kristoffer build at FloQast?',
  'Tell me about the SunPower loan app',
  'What is his AI experience?',
  'What is his tech stack?',
  'What does Kristoffer do outside of work?',
]

const GREETING: ChatMessage = {
  role: 'assistant',
  content:
    "Hey, I'm Kristoffer's portfolio assistant. Ask me about his experience, projects, or stack.",
}

const PEEK_DISMISSED_KEY = 'askwidget:peek-dismissed'
const MAX_INPUT_CHARS = 500
const COUNTER_VISIBLE_AT = 400

export function AskWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [streaming, setStreaming] = useState(false)
  const [showPeek, setShowPeek] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, open])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(PEEK_DISMISSED_KEY)) return
    const timer = window.setTimeout(() => setShowPeek(true), 5500)
    return () => window.clearTimeout(timer)
  }, [])

  const dismissPeek = () => {
    setShowPeek(false)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(PEEK_DISMISSED_KEY, '1')
    }
  }

  const send = async (text: string) => {
    if (!text.trim() || streaming) return
    if (text.length > MAX_INPUT_CHARS) return
    const userMsg: ChatMessage = { role: 'user', content: text.trim() }
    const nextMessages = [...messages, userMsg]
    setMessages([...nextMessages, { role: 'assistant', content: '' }])
    setInput('')
    setStreaming(true)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m !== GREETING)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: 'Request failed.' }))
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = {
            role: 'assistant',
            content: err.error || 'Sorry, something went wrong.',
          }
          return copy
        })
        setStreaming(false)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: buffer }
          return copy
        })
      }
    } catch (err) {
      setMessages((prev) => {
        const copy = [...prev]
        copy[copy.length - 1] = {
          role: 'assistant',
          content: 'Connection error. Please try again.',
        }
        return copy
      })
    } finally {
      setStreaming(false)
    }
  }

  const showSuggestions = messages.length === 1

  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <m.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[min(380px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-7rem))] rounded-2xl border border-cobalt-600/30 dark:border-cobalt-400/30 bg-brand-light dark:bg-brand-surface shadow-2xl flex flex-col overflow-hidden"
              role="dialog"
              aria-label="Ask about Kristoffer's work"
            >
              <header className="flex items-center justify-between px-4 py-3 border-b border-cobalt-600/20 dark:border-cobalt-400/15 bg-gradient-to-r from-cobalt-600/10 to-transparent">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Ask about my work</span>
                  <span className="text-[11px] opacity-60">
                    Powered by Claude
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="p-1.5 rounded-md hover:bg-cobalt-600/10 dark:hover:bg-cobalt-400/10 transition-colors"
                >
                  <FiX />
                </button>
              </header>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-cobalt-600 text-white rounded-br-md whitespace-pre-wrap'
                          : 'bg-cobalt-600/10 dark:bg-cobalt-400/10 text-brand-dark dark:text-brand-light rounded-bl-md'
                      }`}
                    >
                      {msg.content ? (
                        msg.role === 'assistant' ? (
                          <MarkdownText text={msg.content} />
                        ) : (
                          msg.content
                        )
                      ) : (
                        <span className="inline-flex gap-1">
                          <Dot delay={0} />
                          <Dot delay={0.15} />
                          <Dot delay={0.3} />
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {showSuggestions && (
                  <div className="flex flex-col gap-2 mt-2">
                    {SUGGESTED.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-left text-sm px-3 py-2 rounded-lg border border-cobalt-600/25 dark:border-cobalt-400/20 hover:border-cobalt-600/60 dark:hover:border-cobalt-400/60 hover:bg-cobalt-600/5 dark:hover:bg-cobalt-400/5 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
                className="flex flex-col gap-1.5 p-3 border-t border-cobalt-600/20 dark:border-cobalt-400/15"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) =>
                      setInput(e.target.value.slice(0, MAX_INPUT_CHARS))
                    }
                    placeholder={
                      streaming ? 'Thinking…' : 'Ask about my experience…'
                    }
                    disabled={streaming}
                    maxLength={MAX_INPUT_CHARS}
                    aria-label="Your question"
                    className="flex-1 bg-cobalt-600/5 dark:bg-cobalt-400/5 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cobalt-600 dark:focus:ring-cobalt-400 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={
                      !input.trim() ||
                      streaming ||
                      input.length > MAX_INPUT_CHARS
                    }
                    aria-label="Send"
                    className="w-10 h-10 rounded-lg bg-cobalt-600 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cobalt-700 transition-colors"
                  >
                    <FiSend />
                  </button>
                </div>
                {input.length >= COUNTER_VISIBLE_AT && (
                  <p
                    className={`text-[11px] text-right ${
                      input.length >= MAX_INPUT_CHARS
                        ? 'text-red-500'
                        : 'opacity-60'
                    }`}
                    aria-live="polite"
                  >
                    {input.length}/{MAX_INPUT_CHARS}
                  </p>
                )}
              </form>
            </m.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2.5">
          <AnimatePresence>
            {showPeek && !open && (
              <m.button
                key="peek"
                type="button"
                onClick={() => {
                  dismissPeek()
                  setOpen(true)
                }}
                initial={{ opacity: 0, x: 16, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="hidden sm:flex items-center gap-2 rounded-full bg-brand-light dark:bg-brand-surface border border-cobalt-600/30 dark:border-cobalt-400/30 shadow-lg pl-3 pr-1.5 py-1.5 text-sm font-medium hover:border-cobalt-600 dark:hover:border-cobalt-400 transition-colors"
                aria-label="Open chat with my AI assistant"
              >
                <span>Ask my AI ↗</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation()
                    dismissPeek()
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation()
                      dismissPeek()
                    }
                  }}
                  aria-label="Dismiss"
                  className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full opacity-60 hover:opacity-100 hover:bg-cobalt-600/10 dark:hover:bg-cobalt-400/10 transition-opacity"
                >
                  <FiX size={12} />
                </span>
              </m.button>
            )}
          </AnimatePresence>

          <m.button
            onClick={() => {
              dismissPeek()
              setOpen((v) => !v)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={open ? 'Close ask widget' : 'Open ask widget'}
            aria-expanded={open}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-cobalt-700 to-cobalt-500 text-white shadow-lg flex items-center justify-center"
          >
            {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
          </m.button>
        </div>
      </div>
    </LazyMotion>
  )
}

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|_([^_\n]+)_|`([^`\n]+)`/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const linkText = match[1]
    const linkHref = match[2]
    const bold = match[3] ?? match[4]
    const italic = match[5] ?? match[6]
    const code = match[7]
    if (linkText !== undefined && linkHref !== undefined) {
      const isExternal = /^https?:\/\//i.test(linkHref)
      const isSafeHref = isExternal || /^(mailto:|\/|#)/i.test(linkHref)
      if (isSafeHref) {
        nodes.push(
          <a
            key={`a-${key++}`}
            href={linkHref}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-cobalt-700 dark:text-cobalt-400 underline underline-offset-2 hover:text-cobalt-500 dark:hover:text-cobalt-300"
          >
            {linkText}
          </a>,
        )
      } else {
        nodes.push(linkText)
      }
    } else if (bold !== undefined) {
      nodes.push(<strong key={`b-${key++}`}>{bold}</strong>)
    } else if (italic !== undefined) {
      nodes.push(<em key={`i-${key++}`}>{italic}</em>)
    } else if (code !== undefined) {
      nodes.push(
        <code
          key={`c-${key++}`}
          className="px-1 py-0.5 rounded bg-cobalt-700/10 dark:bg-cobalt-400/15 text-[12.5px]"
        >
          {code}
        </code>,
      )
    }
    lastIndex = pattern.lastIndex
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

function MarkdownText({ text }: { text: string }) {
  const lines = text.split('\n')
  const blocks: React.ReactNode[] = []
  let listBuffer: string[] = []
  let paragraphBuffer: string[] = []
  let key = 0

  const flushList = () => {
    if (listBuffer.length === 0) return
    blocks.push(
      <ul
        key={`ul-${key++}`}
        className="list-disc pl-5 my-1 space-y-1 marker:text-cobalt-700 dark:marker:text-cobalt-400"
      >
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>,
    )
    listBuffer = []
  }

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return
    const joined = paragraphBuffer.join('\n')
    blocks.push(
      <p key={`p-${key++}`} className="whitespace-pre-wrap">
        {renderInline(joined)}
      </p>,
    )
    paragraphBuffer = []
  }

  for (const raw of lines) {
    const bullet = raw.match(/^\s*[-*]\s+(.*)$/)
    if (bullet) {
      flushParagraph()
      listBuffer.push(bullet[1])
      continue
    }
    if (raw.trim() === '') {
      flushList()
      flushParagraph()
      continue
    }
    flushList()
    paragraphBuffer.push(raw)
  }
  flushList()
  flushParagraph()

  return <div className="flex flex-col gap-2">{blocks}</div>
}

function Dot({ delay }: { delay: number }) {
  return (
    <m.span
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity, delay }}
      className="inline-block w-1.5 h-1.5 rounded-full bg-cobalt-700 dark:bg-cobalt-400"
    />
  )
}

export default AskWidget
