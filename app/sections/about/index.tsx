'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { HeadingDivider } from 'components'
import { TimeLine } from './TimeLine'
import Link from 'next/link'
import Image from 'next/image'

const fadeInLeft = {
  hidden: { opacity: 0, x: -200 },
  visible: { opacity: 1, x: 0 },
}
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}
const transition = {
  duration: 0.9,
  ease: [0.17, 0.55, 0.55, 1] as [number, number, number, number],
  delay: 0.5,
}

const CAREER_START_YEAR = 2018
const CAREER_START_MONTH = 8 // August
const now = new Date()
const yearsShipping =
  now.getFullYear() -
  CAREER_START_YEAR -
  (now.getMonth() + 1 < CAREER_START_MONTH ? 1 : 0)

const STATS = [
  { value: `${yearsShipping}+`, label: 'years shipping production software' },
  { value: 'MS', label: 'Data Analytics, Georgia Tech' },
  { value: 'BS', label: 'Electrical & Computer Engineering, Baylor' },
  { value: 'Eagle Scout', label: 'Eagle Scout, Boy Scouts of America' },
]

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
              robust architectures - most recently leading a
              reconciliation engine rebuild at FloQast
              that unlocks enterprise-scale customers, and previously
              architecting the API and data infrastructure behind a
              solar-financing platform that moved{' '}
              <strong className="text-cobalt-700 dark:text-cobalt-400">
                $2M+ in annual loans
              </strong>
              .
            </p>
            <p>
              I enjoy the full lifecycle: shaping architecture, shipping
              production code, and mentoring engineers.
            </p>
            <p>
              Off the clock you&apos;ll find me exploring Austin with my two
              kids and wife, learning a new guitar solo, or lost in a book
              (yes, The Lord of the Rings is the best fantasy series of all
              time). I&apos;m also an{' '}
              <strong className="text-cobalt-700 dark:text-cobalt-400">
                Eagle Scout
              </strong>{' '}
              and a Baylor Bear for life - Sic &apos;em.
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
