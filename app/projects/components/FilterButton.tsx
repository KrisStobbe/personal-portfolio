import React from 'react'

interface FilterButtonProps {
  onClick: () => void
  label: string
  active: boolean
  children: React.ReactNode
}

/**
 * Renders a filter button component.
 *
 * @param {Function} onClick - The click event handler function.
 * @param {string} label - The label text for the button.
 * @param {boolean} active - Flag indicating if the button is active.
 * @param {React.ReactNode} children - The child elements to be rendered inside the button.
 * @return {React.ReactElement} The rendered filter button component.
 */
export function FilterButton({
  onClick,
  label,
  active,
  children,
}: FilterButtonProps) {
  const activeClassName = 'icon-link-btn--active'

  const buttonClass = `icon-link-btn icon-link-btn--outline w-14 h-10 relative ${
    active ? activeClassName : ''
  }`

  return (
    <div className="relative group">
      <button
        className={buttonClass}
        onClick={onClick}
        aria-label={`Filter projects by ${label.toLowerCase()}`}
      >
        {children}
      </button>
      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </div>
  )
}
