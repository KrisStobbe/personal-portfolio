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

/**
 * AboutSection — personal background + resume CTA + career timeline.
 */
export function AboutSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section id="about" className="section">
        <HeadingDivider title="About me" />
        <div className="pb-16 max-w-5xl flex flex-col gap-3">
          <m.div
            tabIndex={0}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={transition}
            className="text-xl font-light leading-relaxed"
          >
            <div className="pt-2 mb-3 flex">
              <Image
                src="/assets/profile/kris-profile.webp"
                alt="Kristoffer's Profile"
                width={150}
                height={150}
                priority
                className="rounded-full"
              />
            </div>

            <p>
              Hello, I&apos;m Kristoffer, a Senior Software Engineer with a focus on
              full-stack development, data analytics, and cloud infrastructure.
              Proficient in an array of technologies such as TypeScript, Python,
              Java, React, and AWS, I excel in crafting intricate, scalable
              solutions that meet diverse business needs.
            </p>
            <br />
            <p>
              While leading numerous projects, I&apos;ve consistently elevated user
              experiences and streamlined operational processes. One of my
              notable achievements includes overseeing the conception and
              execution of a React-powered financial application complemented by
              a robust RESTful API.
            </p>
            <br />
            <p>
              My educational background includes a Master&apos;s degree in Data
              Analytics from Georgia Tech and a Bachelor&apos;s degree in Electrical
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
            <m.div
              className="mt-5"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={transition}
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
            </m.div>
          </m.div>
        </div>
        <TimeLine />
      </section>
    </LazyMotion>
  )
}
