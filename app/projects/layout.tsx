'use client'

import React, { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { HeadingDivider, Loader } from 'components'
import { Filter } from './components/Filter'
import Error from '../error'
import { Projects } from './components/Projects'
import { IProject } from './components/Projects'
import { FilterOption } from './components/Filter'
import { projects } from './config'

/**
 * Projects page layout component that handles project filtering and display
 * 
 * @returns {JSX.Element} The projects page layout with filtering capabilities
 */
export default function Page() {
  /** Current selected category for filtering projects */
  const [category, setCategory] = useState<FilterOption>(undefined)

  /**
   * Filters the projects based on the selected category
   * If no category is selected, returns all projects
   */
  const filteredProjects: IProject[] = category
    ? projects.filter((project) => project.stack.includes(category))
    : projects

  /**
   * Updates the selected category when a filter is clicked
   * @param {FilterOption} filter - The selected category to filter by
   */
  const onClick = (filter: FilterOption) => setCategory(filter)

  return (
    <div className="container-md">
      <section id="projects" className="section">
        <HeadingDivider title="Relevant projects" />

        <Filter onClick={onClick} />

        <Suspense
          fallback={
            <div className="flex-center">
              <Loader />
            </div>
          }
        >
          <ErrorBoundary FallbackComponent={Error}>
            {filteredProjects.length === 0 ? (
              <div className="flex-center">
                <h3 className="text-2xl">
                  No projects found in {category} category
                </h3>
              </div>
            ) : (
              <Projects projects={filteredProjects} />
            )}
          </ErrorBoundary>
        </Suspense>
      </section>
    </div>
  )
}
