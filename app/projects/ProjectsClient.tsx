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
 * Client-side projects browser with category filtering.
 */
export function ProjectsClient() {
  const [category, setCategory] = useState<FilterOption>(undefined)

  const filteredProjects: IProject[] = category
    ? projects.filter((project) => project.stack.includes(category))
    : projects

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
