/** Author name for the portfolio */
const author = 'Kristoffer Stobbe'
/** Detailed description of the portfolio and author */
const description =
  'Kristoffer Stobbe: Software Engineer building AI-driven and event-driven systems, and full-stack platforms that have moved $2M+ in annual loan volume. MS, Georgia Tech.'
/** Base URL for the portfolio */
const url = 'https://krisstobbe.com/'

/**
 * Interface representing an OpenGraph image configuration
 * @interface OpenGraphImage
 */
interface OpenGraphImage {
  /** URL of the image */
  url: string
  /** Width of the image in pixels */
  width: number
  /** Height of the image in pixels */
  height: number
  /** Alt text for accessibility */
  alt: string
}

/**
 * Interface representing OpenGraph metadata configuration
 * @interface OpenGraph
 */
interface OpenGraph {
  /** Title of the page */
  title: string
  /** Description of the page content */
  description: string
  /** Canonical URL of the page */
  url: string
  /** Name of the website */
  siteName: string
  /** Array of OpenGraph images */
  images: OpenGraphImage[]
  /** Locale of the content */
  locale: string
  /** Type of content */
  type: string
}

/**
 * Interface representing an author configuration
 * @interface Author
 */
interface Author {
  /** Name of the author */
  name: string
  /** URL of the author's profile */
  url: string
}

/**
 * Interface representing the complete application metadata configuration
 * @interface AppMetadata
 */
interface AppMetadata {
  /** Base URL for all metadata */
  metadataBase: URL
  /** Title configuration with default and template */
  title: {
    /** Default title */
    default: string
    /** Template for dynamic titles */
    template: string
  }
  /** Description of the application */
  description: string
  /** Array of SEO keywords */
  keywords: string[]
  /** Creator of the content */
  creator: string
  /** Array of authors */
  authors: Author[]
  /** OpenGraph metadata configuration */
  openGraph: OpenGraph
}

/**
 * Application metadata configuration for SEO and social sharing.
 * 
 * @constant
 * @type {AppMetadata}
 * 
 * @example
 * ```tsx
 * // Usage in Next.js metadata
 * export const metadata = { ...AppMetadata }
 * ```
 */
export const AppMetadata: AppMetadata = {
  metadataBase: new URL('https://krisstobbe.com/'),
  title: {
    default: `Portfolio | ${author}`,
    template: `%s | ${author}`,
  },
  description: description,
  keywords: [
    'Kristoffer Stobbe',
    'Software Engineer',
    'Full-stack engineer',
    'AI engineering',
    'Event-driven systems',
    'TypeScript React engineer',
    'Georgia Tech Data Analytics',
  ],
  creator: author,
  authors: [{ name: author, url: url }],
  openGraph: {
    title: `${author} | Portfolio`,
    description: description,
    url: url,
    siteName: `${author} | Portfolio`,
    images: [
      {
        url: 'https://krisstobbe.com/assets/portfolio.png',
        width: 800,
        height: 600,
        alt: 'My personal portfolio website',
      },
      {
        url: 'https://krisstobbe.com/assets/portfolio.png',
        width: 1800,
        height: 1600,
        alt: 'My personal portfolio website',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}
