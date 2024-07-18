'use client'

import { useTheme } from 'next-themes'
import { BsMoon, BsSun } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { animate, exit, initial, transition } from 'utils'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    if (!theme) {
      setTheme('dark')
    }
  }, [theme, setTheme])

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
      >
        {theme === 'dark' ? <BsSun /> : <BsMoon />}
      </m.button>
    </LazyMotion>
  )
}
