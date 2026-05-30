'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import { HeadingDivider } from 'components'
import { SITE_ROUTES } from '../../constants'
import { Filter } from './components/Filter'
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
        <Link
          href={SITE_ROUTES.home}
          className="inline-flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 hover:text-cobalt-700 dark:hover:text-cobalt-400 transition-colors mb-6"
          aria-label="Back to home"
        >
          <BsArrowLeft />
          Back to home
        </Link>

        <HeadingDivider title="Relevant projects" />

        <Filter onClick={onClick} />

        {filteredProjects.length === 0 ? (
          <div className="flex-center">
            <h3 className="text-2xl">
              No projects found in {category} category
            </h3>
          </div>
        ) : (
          <Projects projects={filteredProjects} />
        )}

        <div className="mt-16 flex justify-center">
          <Link
            href={SITE_ROUTES.home}
            className="btn-ghost inline-flex items-center gap-2"
            aria-label="Back to home"
          >
            <BsArrowLeft />
            Back to home
          </Link>
        </div>
      </section>
    </div>
  )
}
