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

  const buttonClass = `icon-link-btn icon-link-btn--outline w-14 h-10 ${
    active ? activeClassName : ''
  }`

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      aria-label={`Filter projects by ${label.toLowerCase()}`}
    >
      {children}
    </button>
  )
}
