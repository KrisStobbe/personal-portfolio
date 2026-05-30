import React, { Suspense, ReactNode, FunctionComponent } from 'react'
import { AppHeader, AppFooter, AppMetadata } from 'components'
import Loading from './loading'
import 'styles/globals.css'
import { ThemeContext } from 'context/theme_context'

/** Next.js page metadata applied to every route by the App Router. */
export const metadata = { ...AppMetadata }

/**
 * Props for {@link RootLayout}.
 */
interface RootLayoutProps {
  /** Page-level content rendered between the header and footer. */
  children: ReactNode
}

/**
 * JSON-LD Person schema injected into the document `<head>` to help
 * search engines understand who this portfolio represents.
 *
 * @see https://schema.org/Person
 */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kristoffer Stobbe',
  url: 'https://krisstobbe.com',
  jobTitle: 'Senior Software Engineer',
  description:
    'Senior Software Engineer with a background in full-stack development, data analytics, and cloud infrastructure.',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Georgia Institute of Technology',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Baylor University',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/krisstobbe',
    'https://github.com/krisstobbe',
  ],
}

/**
 * Top-level App Router layout. Wraps every page in the theme provider,
 * renders the shared header / footer, and exposes a Suspense boundary
 * with a loading fallback for streamed segments.
 *
 * @param props - Component props.
 * @param props.children - Page-level content rendered inside the shell.
 * @returns {JSX.Element} The full HTML document tree.
 */
const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <ThemeContext>
          <AppHeader />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <AppFooter />
        </ThemeContext>
      </body>
    </html>
  )
}

export default RootLayout
