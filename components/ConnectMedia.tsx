'use client'

import React, { FunctionComponent } from 'react'
import { LazyMotion, domAnimation, motion } from 'framer-motion'
import { initial, animate, exit, transition } from 'utils/motions'
import { SOCIAL_MEDIA } from '../constants'
import Link from 'next/link'

interface SocialMediaItem {
  id: string
  url: string
  title: string
  icon: JSX.Element
}

export const ConnectMedia: FunctionComponent = () => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.nav
        role="menu"
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        <ul className="flex items-center gap-5">
          {SOCIAL_MEDIA.map((item: SocialMediaItem) => (
            <li key={item.id}>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.title}
                title={item.title}
                className="text-2xl"
              >
                {item.icon}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </LazyMotion>
  )
}

export default ConnectMedia
