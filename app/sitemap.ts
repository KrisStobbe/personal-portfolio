import type { MetadataRoute } from 'next'

/** Canonical site origin used as the prefix for sitemap entries. */
const SITE_URL = 'https://krisstobbe.com'

/**
 * Builds the XML sitemap exposed at `/sitemap.xml`. Lists the routes
 * worth indexing along with their relative priority and change cadence.
 *
 * @returns {MetadataRoute.Sitemap} The sitemap entries consumed by Next.js.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
