'use client'

import React, { FunctionComponent, useState } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { HeadingDivider } from 'components'
import { TECHNOLOGIES, HEADLINE_TECH } from '../../../constants'

/**
 * A single technology rendered in the stack grid.
 */
interface TechItem {
  /** Display name of the technology. */
  name: string
  /** Icon node shown alongside the name. */
  icon: React.JSX.Element
}

/**
 * A category of related technologies (e.g. "Languages", "Frameworks").
 */
interface Technology {
  /** Heading shown above the items. */
  category: string
  /** Individual technologies grouped under this category. */
  items: TechItem[]
}

/** Framer Motion variants for the section's intro fade-in. */
const introVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

/**
 * "Stack" section of the home page. Shows a compact headline strip of
 * core technologies, with an optional expanded grid of the full
 * tech catalog grouped by category.
 *
 * @returns {JSX.Element} The technologies section.
 */
export const TechnologiesSection: FunctionComponent = () => {
  /** Whether the full stack grid is visible. */
  const [expanded, setExpanded] = useState(false)

  return (
    <LazyMotion features={domAnimation}>
      <section id="tech" className="section">
        <HeadingDivider title="Stack" />
        <m.p
          variants={introVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.17, 0.55, 0.55, 1],
          }}
          className="my-5 text-lg opacity-80 max-w-3xl"
        >
          My core stack. Full technology experience below.
        </m.p>

        <m.div
          variants={introVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          {HEADLINE_TECH.map((item) => (
            <div
              key={item.name}
              className="group flex items-center gap-3 px-4 py-2.5 rounded-lg border border-cobalt-600/20 dark:border-cobalt-400/15 bg-card-light dark:bg-card-dark hover:border-cobalt-600/60 dark:hover:border-cobalt-400/60 transition-colors"
            >
              <span
                aria-hidden="true"
                className="text-cobalt-700 dark:text-cobalt-400"
              >
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </m.div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="tech-full-grid"
            className="text-sm font-medium text-cobalt-700 dark:text-cobalt-400 hover:text-cobalt-600 dark:hover:text-cobalt-200 transition-colors"
          >
            {expanded ? '− Hide full stack' : '+ See full stack'}
          </button>

          {expanded && (
            <m.div
              id="tech-full-grid"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
                {TECHNOLOGIES.map((tech: Technology) => (
                  <div
                    key={tech.category}
                    className="flex flex-col gap-4 flex-1 md:flex-auto"
                  >
                    <h3 className="text-xl font-bold">{tech.category}</h3>
                    <div className="flex items-center flex-wrap gap-x-5 gap-y-6">
                      {tech.items.map((item: TechItem) => (
                        <div
                          key={item.name}
                          className="group relative flex"
                        >
                          <span
                            role="img"
                            aria-label={item.name}
                            className="opacity-80 hover:opacity-100 transition-opacity"
                          >
                            {item.icon}
                          </span>
                          <span className="group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-gray-900 text-xs text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 px-2 py-1 w-max pointer-events-none z-10 shadow-md">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </m.div>
          )}
        </div>
      </section>
    </LazyMotion>
  )
}

export default TechnologiesSection
