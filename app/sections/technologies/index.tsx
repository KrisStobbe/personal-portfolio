'use client'

import React, { FunctionComponent } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { HeadingDivider } from 'components'
import { TECHNOLOGIES } from '../../../constants'

interface TechItem {
  name: string
  icon: JSX.Element
}

interface Technology {
  category: string
  items: TechItem[]
}

const introVariants = {
  hidden: { opacity: 0, x: -300 },
  visible: { opacity: 1, x: 0 },
}

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: i === 0 ? 250 : 200 / Math.max(i, 1),
  }),
  visible: { opacity: 1, y: 0 },
}

/**
 * TechnologiesSection — categorized grid of stacks and tools.
 */
export const TechnologiesSection: FunctionComponent = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section id="tech" className="section">
        <HeadingDivider title="Technologies" />
        <m.p
          tabIndex={0}
          variants={introVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.5,
          }}
          className="my-5 text-2xl"
        >
          I work with the following technologies and tools:
        </m.p>

        {!!TECHNOLOGIES.length && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            {TECHNOLOGIES.map((tech: Technology, index: number) => (
              <m.div
                key={tech.category}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{
                  duration: 0.9,
                  ease: [0.17, 0.55, 0.55, 1],
                  delay: index === 0 ? 0 : 0.1 * index,
                }}
                className="flex flex-col gap-4 flex-1 md:flex-auto"
              >
                <h3 tabIndex={0} className="text-2xl font-bold">
                  {tech.category}
                </h3>
                <div className="flex items-center flex-wrap gap-x-5 gap-y-8">
                  {tech.items.map((item: TechItem) => (
                    <div key={item.name} className="group relative flex">
                      <span tabIndex={0} role="img" aria-label={item.name}>
                        {item.icon}
                      </span>
                      <span className="group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-gray-800 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mt-3 mx-auto px-2 w-max">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </m.div>
            ))}
          </div>
        )}
      </section>
    </LazyMotion>
  )
}

export default TechnologiesSection
