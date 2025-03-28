'use client'

import React, { FunctionComponent } from 'react'
import { LazyMotion, domAnimation, motion } from 'framer-motion'
import { SOCIAL_MEDIA } from '../constants'
import Link from 'next/link'

/**
 * Interface defining the structure of a social media link
 * @interface SocialMediaItem
 */
interface SocialMediaItem {
  /** Unique identifier for the social media item */
  id: string
  /** URL to the social media profile */
  url: string
  /** Display title for the social media link */
  title: string
  /** Icon component for the social media platform */
  icon: JSX.Element
}

/**
 * ConnectMedia component that displays social media links.
 * 
 * @component
 * @example
 * ```tsx
 * <ConnectMedia />
 * ```
 * 
 * @returns {JSX.Element} A navigation menu of social media links
 */
export const ConnectMedia: FunctionComponent = () => {
  /** Animation variants for menu transitions */
  const variants = {
    hidden: { opacity: 0, x: '-100%' },
    visible: { opacity: 1, x: 0 },
  }
  return (
    <LazyMotion features={domAnimation}>
      <motion.nav
        role="menu"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.2 }}
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
