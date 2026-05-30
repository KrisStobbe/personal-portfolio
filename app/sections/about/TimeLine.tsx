'use client'

import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'utils'
import { VerticalTimeline } from './timeline/VerticalTimeline'
import { HorizontalTimeline } from './timeline/HorizontalTimeline'

/**
 * Responsive wrapper that picks the appropriate timeline layout:
 * a horizontal scrollable layout on tablet-and-up, a stacked vertical
 * layout on mobile. Renders the vertical layout during SSR / first
 * paint so the markup is mobile-first and matches the hydrated tree
 * for small screens.
 *
 * @returns {JSX.Element} Either the vertical or horizontal timeline.
 */
export function TimeLine() {
  /** True on viewports >= 768px. */
  const isTabletUp = useMediaQuery('min-width: 768px')
  /** Tracks first client render so we don't trust the media query during SSR. */
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <VerticalTimeline />

  return isTabletUp ? <HorizontalTimeline /> : <VerticalTimeline />
}
