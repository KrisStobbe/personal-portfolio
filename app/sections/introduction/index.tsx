'use client'

import React, { useEffect, useState, useRef, FunctionComponent } from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { WelcomeAnimation } from './IntroAnimation'
import { useScrollTo } from 'hooks'
import { useMediaQuery } from 'utils'

/**
 * Props for the TextElement component
 * @interface TextElementProps
 */
interface TextElementProps {
  /** The text content to be displayed with the first word emphasized */
  element: string
}

/**
 * TextElement component that displays text with the first word emphasized
 * Features:
 * - Animated entrance effect
 * - First word bold styling
 * - Responsive text sizing
 * 
 * @param {TextElementProps} props - Component props containing the text element
 * @returns {JSX.Element} A styled text element with animation
 */
const TextElement: FunctionComponent<TextElementProps> = ({ element }) => {
  const firstWord = element.split(' ')[0]
  const restWords = element.substring(firstWord.length)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <span
      tabIndex={0}
      ref={ref}
      className="text-[17px] md:text-2xl"
      style={{
        transform: isInView ? 'none' : 'translateX(-200px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
        wordWrap: 'break-word',
      }}
    >
      <strong>{firstWord}</strong>
      {restWords}
    </span>
  )
}

/**
 * WelcomeSection component that serves as the main introduction section
 * 
 * Features:
 * - Animated text transitions
 * - Rotating skill descriptions
 * - Responsive layout with grid system
 * - Interactive scroll navigation
 * - Conditional animation display based on screen size
 * 
 * @returns {JSX.Element} The welcome section with animated content
 */
export function WelcomeSection() {
  /** Reference to the main content container */
  const ref = useRef<HTMLDivElement>(null)
  /** Reference to the introduction section */
  const introRef = useRef<HTMLElement>(null)
  /** Tracks if the content is in view for animation triggers */
  const isInView = useInView(ref, { once: true })
  /** Custom hook for smooth scrolling */
  const { scrollToEl } = useScrollTo()
  /** Media query hook for responsive design */
  const isTabletUp = useMediaQuery('min-width: 768px')

  /** State for tracking current skill text index */
  const [count, setCount] = useState<number>(0)
  /** Array of rotating skill descriptions */
  const [text] = useState<string[]>([
    'design dynamic applications',
    'build data pipelines',
    'create responsive web interfaces',
    'analyze data for insights',
    'develop AI-driven solutions',
  ])

  /**
   * Handles click events for smooth scrolling
   * @param {React.MouseEvent<HTMLAnchorElement>} e - The click event
   */
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToEl(e)
  }

  /** Effect to handle rotating text animation */
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % text.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [text.length])

  return (
    <LazyMotion features={domAnimation}>
      <section id="intro" className="section" ref={introRef}>
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] lg:grid-cols-[1fr_0.7fr] gap-4 items-center"
          style={{ height: '75vh' }}
        >
          <div className="py-5 md:py-10">
            <h1
              tabIndex={0}
              ref={ref}
              className="text-3xl md:text-5xl xl:text-6xl font-bold"
              style={{
                transform: isInView ? 'none' : 'translateX(-200px)',
                opacity: isInView ? 1 : 0,
                transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
              }}
            >
              <p>
                Hi - I&apos;m <mark>Kristoffer</mark>, a <mark>passionate</mark>{' '}
                software engineer{' '}
              </p>
            </h1>

            <div className="mt-3 relative flex flex-col overflow-hidden">
              <p
                className="text-[17px] md:text-2xl transform-none opacity-100"
                ref={ref}
                style={{
                  transform: isInView ? 'none' : 'translateX(-200px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
                }}
              >
                I{' '}
                <span
                  className="absolute flex flex-col transition-all duration-500 ease-in-out"
                  style={{ top: `${-100 * count}%`, left: '13px' }}
                >
                  {text.map((element) => (
                    <TextElement key={element} element={element} />
                  ))}
                </span>
              </p>
            </div>

            <div
              className="mt-10"
              ref={ref}
              style={{
                transform: isInView ? 'none' : 'translateY(50px)',
                opacity: isInView ? 1 : 0,
                transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
              }}
            >
              <Link
                href="#projects"
                onClick={onClick}
                tabIndex={0}
                className="btn btn-primary"
                aria-label="Latest projects"
              >
                See my latest projects
              </Link>
            </div>
          </div>

          {isTabletUp && <WelcomeAnimation />}
        </div>
      </section>
    </LazyMotion>
  )
}
