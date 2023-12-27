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
        <div className="pt-10 pb-16 max-w-5xl flex flex-col gap-3">
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
            <p>
              Welcome to my professional space! I'm Kristoffer, a Senior
              Software Engineer with an extensive background in full-stack
              development, data analytics, and technical support. I've led
              numerous projects, enhancing user experiences and optimizing
              operational efficiency through innovative software solutions.
            </p>
            <br />
            <p>
              Throughout my career, I've successfully navigated complex
              challenges, leading the design and development of a dynamic,
              React-based financial application front-end, and contributing to
              Java backend development. My proficiency spans a wide array of
              technologies, including Python, JavaScript, Java, React, and AWS,
              enabling me to construct and maintain sophisticated, scalable
              solutions.
            </p>
            <br />
            <p>
              In addition to my professional endeavors, I'm academically
              accomplished with a Master of Science in Data Analytics from
              Georgia Institute of Technology and a Bachelor of Science in
              Electrical & Computer Engineering from Baylor University. My
              passion for continuous learning extends beyond my career into
              personal interests. I am an avid electric guitar player, and I
              enjoy delving into the depths of philosophy and the mysteries of
              the cosmos and physics.
            </p>
            <br />
            <p>
              My portfolio is a testament to the diverse projects I've
              undertaken and the impact of my work. I invite you to explore it
              and connect with me for potential collaborations, to exchange
              ideas, or simply to embark on a conversation about technology,
              music, or the wonders of the universe!
            </p>
          </div>
        </div>
        <TimeLine />
      </section>
    </LazyMotion>
  )
}
