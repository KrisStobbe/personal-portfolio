'use client'

import React, { useRef, FunctionComponent } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { ConnectMedia } from './ConnectMedia'
import ScrollTop from './ScrollTop'

/**
 * AppFooter component that displays the site footer.
 * 
 * @component
 * @example
 * ```tsx
 * <AppFooter />
 * ```
 * 
 * @returns {JSX.Element} The site footer with social links and navigation
 */
export const AppFooter: FunctionComponent = () => {
  /** Reference to the footer container for animation */
  const footerRef = useRef<HTMLDivElement>(null)
  /** Tracks if the footer is in view for animation triggers */
  const isInView = useInView(footerRef, { once: true })
  /** Current year for copyright notice */
  const year = new Date().getFullYear()

  return (
    <LazyMotion features={domAnimation}>
      <footer
        ref={footerRef}
        className="container-md py-10 mt-5 relative before:absolute before:top-0 before:left-4 before:w-[calc(100%-16px)] before:h-[1px] before:bg-gray-100"
        style={{
          transform: isInView ? 'none' : 'translateX(-200px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s',
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-5">
          <p className="font-light">
            Copyright &copy; {year} Kristoffer Stobbe
          </p>
          <ScrollTop />
          <ConnectMedia />
        </div>
      </footer>
    </LazyMotion>
  )
}

export default AppFooter
