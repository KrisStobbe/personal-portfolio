import { Suspense, useRef } from 'react'
import { domAnimation, LazyMotion, useInView } from 'framer-motion'
import Link from 'next/link'
import { HeadingDivider, Loader } from 'components'
import Error from '../../error'
import { ErrorBoundary } from 'react-error-boundary'
import { Projects } from '../../projects/components/Projects'
import { SITE_ROUTES } from '../../../constants'
import { projects } from 'app/projects/config'

/**
 * ProjectsSection component that displays a preview of the latest projects
 * 
 * Features:
 * - Displays top 3 projects from the projects list
 * - Animated entrance effects
 * - Loading state with Suspense
 * - Error boundary for graceful error handling
 * - "More projects" button with animation
 * - Responsive layout
 * 
 * @returns {JSX.Element} A section displaying the latest projects with navigation
 */
export function ProjectsSection() {
  /** Reference to the "More projects" button for animation */
  const btnRef = useRef<HTMLAnchorElement>(null)
  /** Tracks if the button is in view for animation triggers */
  const isBtnInView = useInView(btnRef, { once: true })

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

          <Link
            href={SITE_ROUTES.projects}
            tabIndex={-1}
            aria-label="Go to projects page"
            ref={btnRef}
            className="btn"
            style={{
              transform: isBtnInView ? 'none' : 'translateX(-50px)',
              opacity: isBtnInView ? 1 : 0,
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
            }}
          >
            <button aria-label="See more projects">More projects</button>
          </Link>
        </div>
      </section>
    </LazyMotion>
  )
}
