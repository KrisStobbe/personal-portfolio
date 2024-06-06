'use client'

import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { initial, animate, exit, transition } from 'utils/motions'
import { SITE_ROUTES, SITE_STRINGS } from '../constants'

export const Logo: FunctionComponent = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.h3
        className="text-xl md:text-2xl font-bold"
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        <Link href={SITE_ROUTES.home} aria-label="Go to home page">
          {SITE_STRINGS.textLogo}
        </Link>
      </m.h3>
    </LazyMotion>
  )
}

export default Logo
