'use client'

import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'utils'
import { VerticalTimeline } from './timeline/VerticalTimeline'
import { HorizontalTimeline } from './timeline/HorizontalTimeline'

export function TimeLine() {
  const isTabletUp = useMediaQuery('min-width: 768px')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Vertical until the media query reports; mobile-first, SSR-friendly.
  if (!mounted) return <VerticalTimeline />

  return isTabletUp ? <HorizontalTimeline /> : <VerticalTimeline />
}
