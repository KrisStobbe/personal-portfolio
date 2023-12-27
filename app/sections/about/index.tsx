'use client'

import React, { useRef } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { HeadingDivider } from 'components'
import { TimeLine } from './TimeLine'

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
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
              <img
                src="/assets/profile/kris-profile.webp"
                alt="Kristoffer's Profile"
                style={{ width: '150px', borderRadius: '50%' }}
              />
            </div>

            <p>
              I'm Kristoffer, a Senior Software Engineer specialized in
              full-stack development, data analytics, and technical support. My
              expertise in leading projects has significantly improved user
              experiences and operational efficiency.
            </p>
            <br />
            <p>
              My career highlights include leading the design and development of
              a React-based financial application with a RESTful API. Skilled in
              Python, JavaScript, Java, React, AWS, and other technologies, I am
              adept at building sophisticated, scalable solutions.
            </p>
            <br />
            <p>
              Academically, I hold a Master's in Data Analytics from Georgia
              Tech and a Bachelor's in Electrical & Computer Engineering from
              Baylor University. Beyond work, I'm passionate about playing
              electric guitar and exploring philosophy, astronomy, and physics.
            </p>
            <br />
          </div>
        </div>
        <TimeLine />
      </section>
    </LazyMotion>
  )
}
