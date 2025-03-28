'use client'

import React, { FunctionComponent } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { initial, animate, exit, transition } from 'utils/motions'

/**
 * Interface defining the props for the HeadingDivider component
 * @interface HeadingDividerProps
 */
interface HeadingDividerProps {
  /** Optional title text to display */
  title?: string
}

/**
 * HeadingDivider component that displays section titles with animations.
 * 
 * @component
 * @example
 * ```tsx
 * <HeadingDivider title="About Me" />
 * ```
 * 
 * @param {HeadingDividerProps} props - Component props containing the title
 * @returns {JSX.Element} An animated section heading
 */
export const HeadingDivider: FunctionComponent<HeadingDividerProps> = ({
  title = '',
}) => {
  return (
    <header className="flex items-center">
      <LazyMotion features={domAnimation}>
        <m.h2
          tabIndex={0}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          className="heading-divider"
        >
          {title}
        </m.h2>
      </LazyMotion>
    </header>
  )
}

export default HeadingDivider
