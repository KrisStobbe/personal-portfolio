'use client'

import {
  WelcomeSection,
  AboutSection,
  TechnologiesSection,
  ProjectsSection,
} from 'app/sections'

/**
 * Main page component that serves as the entry point for the portfolio.
 * 
 * @component
 * @example
 * ```tsx
 * // The page component is automatically rendered by Next.js
 * // No manual usage required
 * ```
 * 
 * @returns {JSX.Element} The main portfolio page layout containing all sections
 */
export default function Page() {
  return (
    <div className="container-md">
      <WelcomeSection />
      <AboutSection />
      <ProjectsSection />
      <TechnologiesSection />
    </div>
  )
}
