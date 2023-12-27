'use client'

import React, { useEffect, useState, useRef, FunctionComponent } from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { WelcomeAnimation } from './IntroAnimation'
import { useScrollTo } from 'hooks'
import { useMediaQuery } from 'utils'

interface TextElementProps {
  element: string
}

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

export function WelcomeSection() {
  const ref = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })
  const { scrollToEl } = useScrollTo()
  const isTabletUp = useMediaQuery('min-width: 768px')

  const [count, setCount] = useState<number>(0)
  const [text] = useState<string[]>([
    'design dynamic applications',
    'build data pipelines',
    'create responsive web interfaces',
    'analyze data for insights',
    'develop AI-driven solutions',
  ])

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToEl(e)
  }

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
