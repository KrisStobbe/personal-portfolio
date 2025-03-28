'use client'

import React from 'react'
import Layout from './layout'

/**
 * Projects page component that serves as the main entry point for the projects section
 * 
 * This component:
 * - Renders the main projects layout
 * - Acts as a wrapper for the projects section
 * - Provides a clean container for the projects content
 * 
 * @returns {JSX.Element} The projects page with its layout
 */
export default function Page() {
  return (
    <div>
      <Layout />
    </div>
  )
}
