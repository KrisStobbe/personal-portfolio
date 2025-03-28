'use client'

import React, { useRef } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { HeadingDivider } from 'components'
import { TimeLine } from './TimeLine'
import Link from 'next/link'
import Image from 'next/image'

/**
 * AboutSection component that displays personal information and professional background
 * 
 * @returns {JSX.Element} The about section with personal information and timeline
 */
export function AboutSection() {
  /** Reference to the animated content container */
  const ref = useRef<HTMLDivElement>(null)
  /** Tracks if the content is in view for animation triggers */
  const isInView = useInView(ref, { once: true })

  return (
    <LazyMotion features={domAnimation}>
      <section id="about" className="section">
        <HeadingDivider title="About me" />
        <div className="pb-16 max-w-5xl flex flex-col gap-3">
          <div
            tabIndex={0}
            ref={ref}
            className="text-xl font-light leading-relaxed"
            style={{
              transform: isInView ? 'none' : 'translateX(-200px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
            }}
          >
            {/* Circular Image */}
            <div className="pt-2 mb-3" style={{ display: 'flex' }}>
              <Image
                src="/assets/profile/kris-profile.webp"
                alt="Kristoffer's Profile"
                width={150}
                height={150}
                style={{ borderRadius: '50%' }}
              />
            </div>

            <p>
              Hello, I'm Kristoffer, a Senior Software Engineer with a focus on
              full-stack development, data analytics, and cloud infrastructure.
              Proficient in an array of technologies such as TypeScript, Python,
              Java, React, and AWS, I excel in crafting intricate, scalable
              solutions that meet diverse business needs.
            </p>
            <br />
            <p>
              While leading numerous projects, I've consistently elevated user
              experiences and streamlined operational processes. One of my
              notable achievements includes overseeing the conception and
              execution of a React-powered financial application complemented by
              a robust RESTful API.
            </p>
            <br />
            <p>
              My educational background includes a Master's degree in Data
              Analytics from Georgia Tech and a Bachelor's degree in Electrical
              & Computer Engineering from Baylor University, underscoring my
              commitment to continuous learning and expertise in the field.
            </p>
            <br />
            <p>
              Beyond the realm of software engineering, I find joy in playing
              electric guitar and exploring the fields of philosophy, astronomy,
              and physics. I believe in fostering not just professional growth,
              but also nurturing passions and interests outside of work for a
              balanced and fulfilling life.
            </p>
            <br />
            <div
              className="mt-5"
              ref={ref}
              style={{
                transform: isInView ? 'none' : 'translateY(50px)',
                opacity: isInView ? 1 : 0,
                transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
              }}
            >
              <Link
                href="/assets/resume/kristoffer-stobbe-resume.pdf"
                tabIndex={0}
                className="btn btn-primary"
                aria-label="View Resume"
                target="_blank"
              >
                View Resume
              </Link>
            </div>
          </div>
        </div>
        <TimeLine />
      </section>
    </LazyMotion>
  )
}
