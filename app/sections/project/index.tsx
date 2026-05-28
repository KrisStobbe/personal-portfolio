'use client'

import { Suspense } from 'react'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import Link from 'next/link'
import { HeadingDivider, Loader } from 'components'
import Error from '../../error'
import { ErrorBoundary } from 'react-error-boundary'
import { Projects } from '../../projects/components/Projects'
import { SITE_ROUTES } from '../../../constants'
import { projects } from 'app/projects/config'

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

/**
 * ProjectsSection — landing-page preview of the latest projects with a CTA to the full list.
 */
export function ProjectsSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section id="projects" className="section">
        <HeadingDivider title="Latest projects" />
        <div className="h-10 md:h-14" />

        <div className="flex flex-col items-center gap-8 md:gap-14">
          <Suspense
            fallback={
              <div className="flex-center">
                <Loader />
              </div>
            }
          >
            <ErrorBoundary FallbackComponent={Error}>
              {projects && <Projects projects={projects.slice(0, 3)} />}
            </ErrorBoundary>
          </Suspense>

          <m.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.17, 0.55, 0.55, 1],
              delay: 0.5,
            }}
          >
            <Link
              href={SITE_ROUTES.projects}
              tabIndex={-1}
              aria-label="Go to projects page"
              className="btn"
            >
              <button aria-label="See more projects">More projects</button>
            </Link>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
