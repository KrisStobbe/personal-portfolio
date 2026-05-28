'use client'

import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { initial, animate, exit, transition } from 'utils/motions'
import { SITE_ROUTES } from '../constants'

const Symbol: FunctionComponent = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id="logo-grad"
        x1="0"
        y1="0"
        x2="28"
        y2="28"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#1d4ed8" />
        <stop offset="1" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <rect width="28" height="28" rx="5" fill="url(#logo-grad)" />
    <path
      d="M19 7 L9 21"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
)

export const Logo: FunctionComponent = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.h3
        className="font-bold"
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        <Link
          href={SITE_ROUTES.home}
          aria-label="Kristoffer Stobbe - home"
          className="group flex items-center gap-3"
        >
          <Symbol />
          <span className="hidden sm:flex flex-col leading-[1.15]">
            <span className="text-[15px] font-semibold tracking-tight">
              Kristoffer Stobbe
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.22em] opacity-55 font-medium">
              Senior Software Engineer
            </span>
          </span>
        </Link>
      </m.h3>
    </LazyMotion>
  )
}

export default Logo
