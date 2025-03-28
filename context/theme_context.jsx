'use client'

import { ThemeProvider } from 'next-themes'

/**
 * ThemeContext component that provides theme functionality to the application.
 * Uses next-themes to handle theme switching and persistence.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped with theme context
 * @returns {JSX.Element} A ThemeProvider component wrapping the children
 */
export function ThemeContext({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
