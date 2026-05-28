import React, { Suspense, ReactNode, FunctionComponent } from 'react'
import { AppHeader, AppFooter, AppMetadata } from 'components'
import Loading from './loading'
import 'styles/globals.css'
import { ThemeContext } from 'context/theme_context'

export const metadata = { ...AppMetadata }

interface RootLayoutProps {
  children: ReactNode
}

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
