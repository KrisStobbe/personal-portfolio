import React, { useRef, useState } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { TbBrandJavascript, TbBrandNextjs } from 'react-icons/tb'
import { FaReact } from 'react-icons/fa'
import { FilterButton } from './FilterButton'

export type FilterOption = 'React' | 'Next.js' | 'JavaScript' | undefined

interface FilterProps {
  onClick?: (filter: FilterOption) => void
}

/**
 * Renders a filter component.
 *
 * @param {FilterProps} onClick - Optional function to handle filter click events.
 * @return {JSX.Element} The rendered filter component.
 */
export function Filter({ onClick = (f) => f }: FilterProps) {
  const animRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(animRef, { once: true })
  const [activeFilter, setActiveFilter] = useState<FilterOption>(undefined)

  /**
   * Handles the click event for a filter option.
   *
   * @param {FilterOption} filter - The selected filter option.
   * @return {void} This function does not return a value.
   */
  const handleFilterClick = (filter: FilterOption) => {
    onClick(filter)
    setActiveFilter(filter)
  }

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={animRef}
        className="flex items-start flex-col sm:flex-row sm:items-center gap-4 my-10"
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s',
        }}
      >
        <h3
          aria-label="Filter projects"
          tabIndex={0}
          className="font-bold text-xl"
        >
          Filter by:
        </h3>
        <div className="flex items-center gap-4">
          <FilterButton
            onClick={() => handleFilterClick(undefined)}
            label="All"
            active={activeFilter === undefined}
          >
            All
          </FilterButton>
          <FilterButton
            onClick={() => handleFilterClick('React')}
            label="React"
            active={activeFilter === 'React'}
          >
            <FaReact size={20} />
          </FilterButton>
          <FilterButton
            onClick={() => handleFilterClick('Next.js')}
            label="Next.js"
            active={activeFilter === 'Next.js'}
          >
            <TbBrandNextjs size={20} />
          </FilterButton>
          <FilterButton
            onClick={() => handleFilterClick('JavaScript')}
            label="JavaScript"
            active={activeFilter === 'JavaScript'}
          >
            <TbBrandJavascript size={20} />
          </FilterButton>
        </div>
      </div>
    </LazyMotion>
  )
}
