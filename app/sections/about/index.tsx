'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { HeadingDivider } from 'components'
import { TimeLine } from './TimeLine'
import Link from 'next/link'
import Image from 'next/image'

/** Framer Motion variants for left-to-right entrance. */
const fadeInLeft = {
  hidden: { opacity: 0, x: -200 },
  visible: { opacity: 1, x: 0 },
}
/** Framer Motion variants for bottom-to-top entrance. */
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}
/** Shared transition timing for the section's animations. */
const transition = {
  duration: 0.9,
  ease: [0.17, 0.55, 0.55, 1] as [number, number, number, number],
  delay: 0.5,
}

/** Year career started; used to compute years-of-experience at render time. */
const CAREER_START_YEAR = 2018
/** Month (1-12) career started; used to handle partial-year rounding. */
const CAREER_START_MONTH = 5 // May
/** Snapshot of "now" taken at module load. */
const now = new Date()
/**
 * Whole years of professional experience, computed at module load.
 * Subtracts one if the current month is before the career-start month
 * so we don't round up before the work-anniversary lands.
 */
const yearsShipping =
  now.getFullYear() -
  CAREER_START_YEAR -
  (now.getMonth() + 1 < CAREER_START_MONTH ? 1 : 0)

/** Stat tiles shown alongside the bio copy. */
const STATS = [
  { value: `${yearsShipping}+`, label: 'years shipping production software' },
  { value: 'MS', label: 'Data Analytics, Georgia Tech' },
  { value: 'BS', label: 'Electrical & Computer Engineering, Baylor' },
  { value: 'Eagle Scout', label: 'Eagle Scout, Boy Scouts of America' },
]

/**
 * "About" section of the home page: profile photo, bio copy, stat tiles,
 * resume / LinkedIn CTAs, and the career timeline.
 *
 * @returns {JSX.Element} The about section.
 */
export function AboutSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section id="about" className="section">
        <HeadingDivider title="About" />
        <div className="pb-16 max-w-5xl grid md:grid-cols-[160px_1fr] gap-8 items-start mt-8">
          <m.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={transition}
          >
            <Image
              src="/assets/profile/kris-profile.webp"
              alt="Kristoffer Stobbe"
              width={160}
              height={160}
              priority
              className="rounded-2xl ring-1 ring-cobalt-600/30 dark:ring-cobalt-400/30"
            />
          </m.div>

          <m.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={transition}
            className="flex flex-col gap-5 text-lg leading-relaxed"
          >
            <p>
              I&apos;m a full-stack software engineer with{' '}
              <strong className="text-cobalt-700 dark:text-cobalt-400">
                {yearsShipping}+ years
              </strong>{' '}
              of experience building data-intensive platforms across fintech
              and clean energy. I specialize in designing scalable,
              robust architectures. Most recently, I led the rebuild of
              FloQast&apos;s reconciliation engine to support
              enterprise-scale growth. Prior to that, I architected the
              APIs and data infrastructure behind a solar financing
              platform that facilitated over{' '}
              <strong className="text-cobalt-700 dark:text-cobalt-400">
                $2M in annual loans
              </strong>
              .
            </p>
            <p>
              I enjoy the full lifecycle: shaping architecture, shipping
              production code, and growing alongside the engineers I work
              with.
            </p>
            <p>
              Off the clock you&apos;ll find me exploring Austin with my two
              kids and wife, learning a new guitar solo, or lost in a book
              (yes, The Lord of the Rings is the best fantasy series of all
              time). I&apos;m also an Eagle Scout and a Baylor Bear for life. Sic &apos;em!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-cobalt-600/30 dark:border-cobalt-400/20 bg-card-light dark:bg-card-dark px-3 py-4"
                >
                  <div className="text-xl md:text-2xl font-extrabold text-cobalt-700 dark:text-cobalt-400 whitespace-nowrap">
                    {stat.value}
                  </div>
                  <div className="text-xs opacity-75 leading-snug mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <m.div
              className="mt-4 flex flex-wrap gap-3"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={transition}
            >
              <Link
                href="/assets/resume/kristoffer-stobbe-resume.pdf"
                className="btn"
                aria-label="View resume"
                target="_blank"
              >
                View resume ↗
              </Link>
              <Link
                href="https://www.linkedin.com/in/krisstobbe"
                className="btn-ghost"
                aria-label="LinkedIn profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </Link>
            </m.div>
          </m.div>
        </div>
        <TimeLine />
      </section>
    </LazyMotion>
  )
}
