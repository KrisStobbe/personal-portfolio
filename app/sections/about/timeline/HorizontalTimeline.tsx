'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { TimeLineData } from './data'

const SCROLL_PADDING = 24 // matches inner ol px-6 + scroll-pl-6

export function HorizontalTimeline() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const rafIdRef = useRef<number | null>(null)

  const recomputeNavState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  /**
   * Without dynamic end-padding the last item can't be snap-aligned to the
   * viewport's left edge; scrollLeft maxes out before reaching that point,
   * which strands the arrow N items short of the end. Pad the right of the
   * inner list so the trailing item has room to snap-start.
   */
  const adjustEndPadding = useCallback(() => {
    const el = scrollerRef.current
    const ol = listRef.current
    const lastItem = itemRefs.current[itemRefs.current.length - 1]
    if (!el || !ol || !lastItem) return
    const desired = Math.max(
      SCROLL_PADDING,
      el.clientWidth - lastItem.offsetWidth - SCROLL_PADDING,
    )
    ol.style.paddingRight = `${desired}px`
  }, [])

  const recomputeActive = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const probeX = el.scrollLeft + SCROLL_PADDING + 12 // a bit past the left edge
    let nearest = 0
    let smallestDist = Infinity
    itemRefs.current.forEach((node, i) => {
      if (!node) return
      const dist = Math.abs(probeX - node.offsetLeft)
      if (dist < smallestDist) {
        smallestDist = dist
        nearest = i
      }
    })
    setActiveIndex(nearest)
  }, [])

  const handleScroll = useCallback(() => {
    if (rafIdRef.current != null) return
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null
      recomputeNavState()
      recomputeActive()
    })
  }, [recomputeActive, recomputeNavState])

  const scrollToIndex = useCallback((i: number) => {
    const el = scrollerRef.current
    const item = itemRefs.current[i]
    if (!el || !item) return
    const target = item.offsetLeft - SCROLL_PADDING
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    requestAnimationFrame(() => {
      adjustEndPadding()
      el.scrollLeft = 0
      recomputeNavState()
      recomputeActive()
    })
    const onResize = () => {
      adjustEndPadding()
      recomputeNavState()
      recomputeActive()
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
    }
  }, [adjustEndPadding, recomputeActive, recomputeNavState])

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollToIndex(Math.min(activeIndex + 1, TimeLineData.length - 1))
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollToIndex(Math.max(activeIndex - 1, 0))
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          onKeyDown={handleKey}
          tabIndex={0}
          role="region"
          aria-label="Career timeline (use arrow keys to navigate)"
          className="timeline-scroller overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-pl-6 scroll-pr-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-light rounded-md pt-2 pb-2"
        >
          <ol
            ref={listRef}
            className="relative flex flex-row flex-nowrap items-stretch gap-6 px-6 w-max"
          >
            {/* Continuous timeline spine running through year badges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-7 left-6 right-6 h-px bg-black/15 dark:bg-white/15"
            />

            {TimeLineData.map((item, index) => {
              const isActive = index === activeIndex
              return (
                <m.li
                  key={`${item.year}-${index}`}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{
                    duration: 0.5,
                    delay: 0.04 * index,
                    ease: [0.17, 0.55, 0.55, 1],
                  }}
                  className="snap-start shrink-0 w-72 flex flex-col items-center gap-4"
                >
                  <m.div
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      boxShadow: isActive
                        ? '0 0 0 6px rgba(49, 130, 206, 0.18)'
                        : '0 0 0 0px rgba(49, 130, 206, 0)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 w-14 h-14 rounded-full bg-blue-light text-white font-bold flex items-center justify-center text-sm shadow-md"
                  >
                    {item.year}
                  </m.div>
                  <div className="w-full min-h-[200px] flex-1 rounded-lg bg-card-light dark:bg-card-dark border border-black/5 dark:border-white/5 p-5 shadow-sm flex flex-col gap-3">
                    <header className="flex flex-col gap-0.5">
                      <h4
                        tabIndex={0}
                        className="text-base font-bold leading-snug"
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm opacity-75">
                        {item.org} · {item.displayDate}
                      </p>
                    </header>
                    <p
                      tabIndex={0}
                      aria-label={`${item.displayDate} at ${item.org}: ${item.summary}`}
                      className="text-sm leading-relaxed"
                    >
                      {item.summary}
                    </p>
                  </div>
                </m.li>
              )
            })}
          </ol>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous timeline item"
            onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center transition-opacity hover:bg-badge-light dark:hover:bg-badge-dark disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronLeft size={16} />
          </button>

          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Timeline progress"
          >
            {TimeLineData.map((_, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to timeline item ${i + 1}`}
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-6 bg-blue-light'
                      : 'w-2 bg-black/20 dark:bg-white/25 hover:bg-black/40 dark:hover:bg-white/40'
                  }`}
                />
              )
            })}
          </div>

          <button
            type="button"
            aria-label="Next timeline item"
            onClick={() =>
              scrollToIndex(Math.min(activeIndex + 1, TimeLineData.length - 1))
            }
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center transition-opacity hover:bg-badge-light dark:hover:bg-badge-dark disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>
    </LazyMotion>
  )
}
