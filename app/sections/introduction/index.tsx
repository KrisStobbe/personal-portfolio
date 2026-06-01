'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { WelcomeAnimation } from './IntroAnimation'
import { useScrollTo } from 'hooks'
import { useMediaQuery } from 'utils'

/** Framer Motion variants for upward fade-in animations. */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}
/** Shared transition timing for the hero animations. */
const transition = {
  duration: 0.8,
  ease: [0.17, 0.55, 0.55, 1] as [number, number, number, number],
  delay: 0.2,
}

/** Rotating list of headline accomplishments displayed under the title. */
const OUTCOMES = [
  'designed an event-driven reconciliation engine',
  'shipped an AI-driven GL-mapping tool',
  'launched a full-stack loan app powering $2M+ in annual volume',
  'earned an MS in Data Analytics from Georgia Tech',
  'cut API response times ~75% with a new caching service',
  "won an Operational Excellence Award at FloQast's inaugural hackathon",
  'preparing for fantasy football season',
]

/**
 * Hero / welcome section of the home page. Displays the headline,
 * a rotating outcome strap-line, primary CTAs, and (on tablet+) the
 * intro animation alongside the copy.
 *
 * @returns {JSX.Element} The welcome section.
 */
export function WelcomeSection() {
  /** Smooth-scroll helper used by the in-page anchor CTA. */
  const { scrollToEl } = useScrollTo()
  /** True on viewports >= 768px; gates the side-by-side hero animation. */
  const isTabletUp = useMediaQuery('min-width: 768px')

  /** Index of the currently visible outcome in {@link OUTCOMES}. */
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % OUTCOMES.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  /**
   * Click handler for in-page anchor CTAs: prevents the default
   * navigation and smooth-scrolls to the target section instead.
   *
   * @param e - Click event from the anchor.
   */
  const onJump = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToEl(e)
  }

  return (
    <LazyMotion features={domAnimation}>
      <section id="intro" className="section">
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] lg:grid-cols-[1fr_0.7fr] gap-8 items-center"
          style={{ minHeight: '75vh' }}
        >
          <div className="py-5 md:py-10 flex flex-col gap-7">
            <m.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={transition}
              className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.05] tracking-tight"
            >
              Hi, I&apos;m <mark>Kristoffer</mark>. I turn complex problems
              into <mark>reliable</mark> software.
            </m.h1>

            <m.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.35 }}
              className="text-lg md:text-xl text-brand-dark/80 dark:text-brand-light/70 min-h-[5.25rem] sm:min-h-[3.5rem] md:min-h-[3.75rem]"
            >
              <span className="opacity-70">Most recently: </span>
              <m.span
                key={OUTCOMES[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="font-medium text-brand-dark dark:text-brand-light"
              >
                {OUTCOMES[index]}
              </m.span>
            </m.div>

            <m.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 mt-2"
            >
              <Link
                href="#projects"
                onClick={onJump}
                className="btn"
                aria-label="View projects"
              >
                View projects
              </Link>
              <Link
                href="/assets/resume/kristoffer-stobbe-resume.pdf"
                target="_blank"
                className="btn-ghost"
                aria-label="View resume"
              >
                View resume ↗
              </Link>
            </m.div>
          </div>

          {isTabletUp && <WelcomeAnimation />}
        </div>
      </section>
    </LazyMotion>
  )
}
