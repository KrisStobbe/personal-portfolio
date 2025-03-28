import React, { Suspense, ReactNode, FunctionComponent } from 'react'
import { AppHeader, AppFooter, AppMetadata } from 'components'
import Loading from './loading'
import 'styles/globals.css'
import { ThemeContext } from 'context/theme_context'

export const metadata = { ...AppMetadata }

/**
 * Interface defining the props for the RootLayout component
 * @interface RootLayoutProps
 */
interface RootLayoutProps {
  /** Child components to be rendered within the layout */
  children: ReactNode
}

/**
 * RootLayout component that provides the main application structure.
 * 
 * @component
 * @example
 * ```tsx
 * <RootLayout>
 *   <YourContent />
 * </RootLayout>
 * ```
 * 
 * @param {RootLayoutProps} props - Component props containing child elements
 * @returns {JSX.Element} The root layout structure of the application
 */
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
