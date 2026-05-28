'use client'

import React, { FunctionComponent } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { ConnectMedia } from './ConnectMedia'
import ScrollTop from './ScrollTop'

/**
 * AppFooter — copyright, scroll-to-top, and social links.
 */
export const AppFooter: FunctionComponent = () => {
  const year = new Date().getFullYear()

  return (
    <LazyMotion features={domAnimation}>
      <m.footer
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          ease: [0.17, 0.55, 0.55, 1],
          delay: 1.5,
        }}
        className="container-md py-10 mt-5 relative before:absolute before:top-0 before:left-4 before:w-[calc(100%-16px)] before:h-[1px] before:bg-gray-100"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-5">
          <p className="font-light">
            Copyright &copy; {year} Kristoffer Stobbe
          </p>
          <ScrollTop />
          <ConnectMedia />
        </div>
      </m.footer>
    </LazyMotion>
  )
}

export default AppFooter
