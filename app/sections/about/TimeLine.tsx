import React, { useEffect, useRef, useState } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'

interface TimeLineItem {
  year: number
  text: string
}

const TimeLineData: TimeLineItem[] = [
  {
    year: 2018,
    text: 'Graduated from Baylor University with a BS in Electrical & Computer Engineering, Minor in Mathematics.',
  },
  {
    year: 2018,
    text: 'Joined SAS Institute, starting my journey in software and data analytics.',
  },
  {
    year: 2020,
    text: 'Joined SunPower as a Data Analyst, designing data schemas and building full stack applications.',
  },
  {
    year: 2022,
    text: 'Promoted to Sr. Software Engineer, leading dynamic financial application development.',
  },
  {
    year: 2023,
    text: 'Completed MS in Data Analytics from Georgia Institute of Technology.',
  },
]

export function TimeLine() {
  const colorMode = 'dark'
  const [, setActiveItem] = useState<number>(0)
  const carouselRef = useRef<HTMLUListElement>(null)
  const isInView = useInView(carouselRef, { once: true })

  const scroll = (node: HTMLUListElement | null, left: number) => {
    node?.scrollTo({ left, behavior: 'smooth' })
  }

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, i: number) => {
    e.preventDefault()
    if (carouselRef.current) {
      const scrollLeft = Math.floor(
        carouselRef.current.scrollWidth * 0.7 * (i / TimeLineData.length),
      )
      scroll(carouselRef.current, scrollLeft)
    }
  }

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
              >
                {/* ... SVG path and defs */}
              </svg>
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
