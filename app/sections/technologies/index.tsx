import React, { useRef, FunctionComponent } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { HeadingDivider } from 'components'
import { TECHNOLOGIES } from '../../../constants'

/**
 * Interface representing a single technology item
 * @interface TechItem
 */
interface TechItem {
  /** Name of the technology */
  name: string
  /** Icon component representing the technology */
  icon: JSX.Element
}

/**
 * Interface representing a technology category
 * @interface Technology
 */
interface Technology {
  /** Name of the technology category */
  category: string
  /** Array of technology items in this category */
  items: TechItem[]
}

/**
 * TechnologiesSection component that displays a grid of technology categories
 * 
 * @returns {JSX.Element} A section displaying technology categories and items
 */
export const TechnologiesSection: FunctionComponent = () => {
  /** Reference to the introduction text for animation */
  const textRef = useRef<HTMLParagraphElement>(null)
  /** Tracks if the text is in view for animation triggers */
  const isTextInView = useInView(textRef, { once: true })
  /** Tracks if the technology stack is in view for animation triggers */
  const isStackInView = useInView(textRef, { once: true })

  return (
    <LazyMotion features={domAnimation}>
      <section id="tech" className="section">
        <HeadingDivider title="Technologies" />
        <p
          ref={textRef}
          tabIndex={0}
          className="my-5 text-2xl"
          style={{
            transform: isTextInView ? 'none' : 'translateX(-300px)',
            opacity: isTextInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          }}
        >
          I work with the following technologies and tools:
        </p>

        {!!TECHNOLOGIES.length && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            {TECHNOLOGIES.map((tech: Technology, index: number) => (
              <div
                key={tech.category}
                className="flex flex-col gap-4 flex-1 md:flex-auto"
                style={{
                  transform: isStackInView
                    ? 'none'
                    : `${
                        index === 0
                          ? 'translateY(250px)'
                          : `translateY(${200 / index}px)`
                      }`,
                  opacity: isStackInView ? 1 : 0,
                  transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                    index === 0 ? 0 : 0.5 * index
                  }s`,
                }}
              >
                <h3 tabIndex={0} className="text-2xl font-bold">
                  {tech.category}
                </h3>
                <div className="flex items-center flex-wrap gap-x-5 gap-y-8">
                  {tech.items.map((item: TechItem) => (
                    <div key={item.name} className="group relative flex">
                      <span tabIndex={0} role="img">
                        {item.icon}
                      </span>
                      <span className="group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-gray-800 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mt-3 mx-auto px-2 w-max">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </LazyMotion>
  )
}

export default TechnologiesSection
