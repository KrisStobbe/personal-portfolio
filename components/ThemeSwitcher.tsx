'use client'

import { useTheme } from 'next-themes'
import { BsMoon, BsSun } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { animate, exit, initial, transition } from 'utils'

/**
 * ThemeSwitcher component that provides dark/light mode toggle functionality
 * 
 * @returns {JSX.Element} A theme toggle button with animations
 */
export const ThemeSwitcher = () => {
  /** State to track component mounting status */
  const [mounted, setMounted] = useState(false)
  /** Theme context from next-themes */
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="w-9 h-9 inline-flex items-center justify-center rounded-md hover:bg-cobalt-700/10 dark:hover:bg-cobalt-400/10 transition-colors"
      >
        {theme === 'dark' ? <BsSun /> : <BsMoon />}
      </m.button>
    </LazyMotion>
  )
}
