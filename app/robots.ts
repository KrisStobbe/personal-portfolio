import type { MetadataRoute } from 'next'

/** Canonical site origin used in generated SEO metadata. */
const SITE_URL = 'https://krisstobbe.com'

/**
 * Generates the `/robots.txt` response served by Next.js. Allows all
 * crawlers and points them at the sitemap.
 *
 * @returns {MetadataRoute.Robots} The robots policy consumed by Next.js.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
