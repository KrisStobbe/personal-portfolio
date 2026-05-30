'use client'

import React, { useRef } from 'react'
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'
import { TimeLineData, TimeLineItem } from './data'

/**
 * Framer Motion variants that slide each timeline card in from the side
 * it'll be displayed on. The `fromLeft` custom value flips the
 * direction so items alternate.
 */
const itemVariants = {
  hidden: (fromLeft: boolean) => ({
    opacity: 0,
    x: fromLeft ? -60 : 60,
  }),
  visible: { opacity: 1, x: 0 },
}

/**
 * Single entry in the vertical timeline. Alternates which column its
 * card sits in (left vs. right of the spine) based on `index`, and
 * highlights the year badge while the entry is roughly centered in
 * the viewport.
 *
 * @param props.item - Timeline entry to render.
 * @param props.index - Position of the entry in the list (used for layout).
 */
function VerticalItem({
  item,
  index,
}: {
  item: TimeLineItem
  index: number
}) {
  /** Ref used to drive the "in view" highlight on the year badge. */
  const itemRef = useRef<HTMLLIElement>(null)
  /** True while this entry is roughly centered in the viewport. */
  const isActive = useInView(itemRef, { margin: '-45% 0px -45% 0px' })
  /** Whether the card is rendered to the left of the spine. */
  const isLeft = index % 2 === 0

  const sideAlign = isLeft ? 'md:text-right md:items-end' : 'md:items-start'

  return (
    <m.li
      ref={itemRef}
      custom={isLeft}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: 0.6,
        delay: 0.05 * (index % 4),
        ease: [0.17, 0.55, 0.55, 1],
      }}
      className="relative grid md:grid-cols-2 md:gap-10 pl-16 md:pl-0"
    >
      {/* Year badge sits on the spine */}
      <div
        className="absolute left-0 md:left-1/2 top-2 md:-translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <m.div
          animate={{
            scale: isActive ? 1.08 : 1,
            boxShadow: isActive
              ? '0 0 0 6px rgba(49, 130, 206, 0.18)'
              : '0 0 0 0px rgba(49, 130, 206, 0)',
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-12 h-12 rounded-full bg-blue-light text-white font-bold flex items-center justify-center text-sm shadow-md"
        >
          {item.year}
        </m.div>
      </div>

      <div
        className={`${
          isLeft ? 'md:col-start-1 md:pr-10' : 'md:col-start-2 md:pl-10'
        }`}
      >
        <m.div
          animate={{ y: isActive ? -2 : 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-lg bg-card-light dark:bg-card-dark border border-black/5 dark:border-white/5 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 ${sideAlign}`}
        >
          <header className="flex flex-col gap-0.5">
            <h4
              tabIndex={0}
              className="text-lg md:text-xl font-bold leading-snug"
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
            className="leading-relaxed tracking-wide text-base"
          >
            {item.summary}
          </p>
        </m.div>
      </div>
    </m.li>
  )
}

/**
 * Mobile / stacked timeline layout. Renders entries in chronological
 * order down a vertical spine whose fill animates with scroll progress.
 *
 * @returns {JSX.Element} The vertical timeline.
 */
export function VerticalTimeline() {
  /** Wraps the list; used as the scroll-progress target. */
  const containerRef = useRef<HTMLDivElement>(null)
  /** Normalized scroll progress (0–1) over the visible timeline range. */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  })
  /** Animated height of the gradient fill that tracks scroll. */
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className="relative">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-px bg-black/10 dark:bg-white/10"
        />
        <m.div
          aria-hidden="true"
          style={{ height: fillHeight }}
          className="absolute top-0 left-6 md:left-1/2 md:-translate-x-1/2 w-px bg-gradient-to-b from-blue-light via-blue-light/80 to-brand-purple"
        />

        <ol className="flex flex-col gap-10 md:gap-16 py-6">
          {TimeLineData.map((item, index) => (
            <VerticalItem
              key={`${item.year}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </ol>
      </div>
    </LazyMotion>
  )
}
