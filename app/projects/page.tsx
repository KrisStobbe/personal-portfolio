import React from 'react'
import { ProjectsClient } from './ProjectsClient'

/**
 * Server entry for `/projects`. Delegates rendering to the client
 * component {@link ProjectsClient} so the filter UI can be interactive.
 *
 * @returns {JSX.Element} The projects page.
 */
export default function Page() {
  return <ProjectsClient />
}
