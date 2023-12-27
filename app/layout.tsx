import React, { Suspense, ReactNode, FunctionComponent } from 'react'
import { AppHeader, AppFooter, AppMetadata } from 'components'
import Loading from './loading'
import 'styles/globals.css'
import { ThemeContext } from 'context/theme_context'

export const metadata = { ...AppMetadata }

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
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
