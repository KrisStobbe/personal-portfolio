import React, { useEffect, useRef, useState } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'

/**
 * Interface representing a single timeline item
 * @interface TimeLineItem
 */
interface TimeLineItem {
  /** The year of the timeline event */
  year: number
  /** The description of the timeline event */
  text: string
}

/**
 * Array of timeline events representing career and educational milestones
 * @constant {TimeLineItem[]}
 */
const TimeLineData: TimeLineItem[] = [
  {
    year: 2018,
    text: 'Graduated from Baylor University with a B.S. in Electrical & Computer Engineering and a Minor in Mathematics.',
  },
  {
    year: 2018,
    text: 'Began my career at SAS Institute focusing on software and data analytics.',
  },
  {
    year: 2020,
    text: 'Joined SunPower as a Data Analyst & Engineer, focusing on schema design and operational automation.',
  },
  {
    year: 2021,
    text: "Promoted to SunPower's Software Engineering team to work on building financial applications.",
  },
  {
    year: 2022,
    text: 'Promoted to Sr. Software Engineer, leading dynamic financial application development.',
  },
  {
    year: 2023,
    text: 'Completed M.S. in Data Analytics from Georgia Institute of Technology.',
  },
  {
    year: 2024,
    text: 'Joined FloQast as a Software Engineer, working on building scalable accounting software.',
  },
]

/**
 * TimeLine component that displays a horizontally scrollable timeline of career events
 * 
 * Features:
 * - Smooth horizontal scrolling with snap points
 * - Animated entrance effects for timeline items
 * - Responsive design with different widths for different screen sizes
 * - Interactive click-to-scroll functionality
 * - Automatic scroll reset on window resize
 * 
 * @returns {JSX.Element} A scrollable timeline of career events
 */
export function TimeLine() {
  /** Current color mode for styling */
  const colorMode = 'dark'
  /** State to track the currently active timeline item */
  const [, setActiveItem] = useState<number>(0)
  /** Reference to the scrollable timeline container */
  const carouselRef = useRef<HTMLUListElement>(null)
  /** Tracks if the timeline is in view for animation triggers */
  const isInView = useInView(carouselRef, { once: true })

  /**
   * Scrolls the timeline container to a specific position
   * @param {HTMLUListElement | null} node - The timeline container element
   * @param {number} left - The scroll position in pixels
   */
  const scroll = (node: HTMLUListElement | null, left: number) => {
    node?.scrollTo({ left, behavior: 'smooth' })
  }

  /**
   * Handles click events on timeline items to scroll to their position
   * @param {React.MouseEvent<HTMLLIElement>} e - The click event
   * @param {number} i - The index of the clicked item
   */
  const handleClick = (e: React.MouseEvent<HTMLLIElement>, i: number) => {
    e.preventDefault()
    if (carouselRef.current) {
      const scrollLeft = Math.floor(
        carouselRef.current.scrollWidth * 0.7 * (i / TimeLineData.length),
      )
      scroll(carouselRef.current, scrollLeft)
    }
  }

  /**
   * Updates the active item based on scroll position
   */
  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round(
        (carouselRef.current.scrollLeft /
          (carouselRef.current.scrollWidth * 0.7)) *
          TimeLineData.length,
      )
      setActiveItem(index)
    }
  }

  /** Effect to handle window resize events */
  useEffect(() => {
    const handleResize = () => {
      scroll(carouselRef.current, 0)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <ul
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex flex-row flex-nowrap gap-5 justify-between overflow-x-auto snap-x cursor-pointer hide-scroll-bar"
      >
        {TimeLineData.map((item, index) => (
          <li
            id={`carousel__item-${index}`}
            key={index}
            className="flex flex-col gap-3 snap-start w-[calc((100%/2)-30px)] sm:w-1/3 md:w-1/6"
            onClick={(e) => handleClick(e, index)}
            style={{
              transform: isInView
                ? 'none'
                : `translateY(${index === 0 ? 250 : 200 / index}px)`,
              opacity: isInView ? 1 : 0,
              transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                index === 0 ? 0.5 : 1.05 * index
              }s`,
            }}
          >
            <h3
              tabIndex={0}
              aria-label={`What do I do in ${item.year}`}
              className="flex items-center gap-4 text-2xl font-bold"
            >
              {`${item.year}`}
              <svg
                width="208"
                height="6"
                viewBox="0 0 208 6"
                fill={colorMode === 'dark' ? '#fff' : '#232323'}
              />
            </h3>
            <p className="tracking-wide" tabIndex={0}>
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </LazyMotion>
  )
}
