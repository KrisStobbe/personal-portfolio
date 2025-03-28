'use client'

import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useScrollTo } from 'hooks'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { initial, animate, exit, transition } from 'utils'
import { MENU_OPTIONS, SITE_ROUTES, SITE_STRINGS } from '../constants'

/**
 * Interface representing a single menu item
 * @interface MenuItem
 */
interface MenuItem {
  /** Unique identifier for the menu item */
  id: string
  /** URL path for the menu item */
  url: string
  /** Display name for the menu item */
  name: string
}

/**
 * Props for the Menu component
 * @interface MenuProps
 */
interface MenuProps {
  /** Optional callback function for click events */
  onClick?: () => void
}

/**
 * Menu component that provides navigation functionality
 * 
 * @param {MenuProps} props - Component props containing click handler
 * @returns {JSX.Element} A navigation menu with animations
 */
export const Menu: FunctionComponent<MenuProps> = ({ onClick = () => {} }) => {
  /** Current pathname from Next.js router */
  const pathname = usePathname()
  /** Next.js router instance */
  const router = useRouter()
  /** Custom hook for smooth scrolling */
  const { scrollToEl } = useScrollTo()

  /**
   * Sorts menu items in ascending order by ID
   * @param {MenuItem} a - First menu item
   * @param {MenuItem} b - Second menu item
   * @returns {number} Sort order (-1, 0, or 1)
   */
  const sortAscending = (a: MenuItem, b: MenuItem) => a.id.localeCompare(b.id)

  /**
   * Handles menu item click events
   * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e - Click event
   */
  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    scrollToEl(e)
    window.setTimeout(() => onClick(), 350)
  }

  /**
   * Handles back button click events
   * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e - Click event
   */
  const handleBackClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault()
    onClick()
    setTimeout(() => {
      router.push(SITE_ROUTES.home)
    }, 350)
  }

  /** Animation variants for menu transitions */
  const variants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
  }

  const mainMenu = (
    <m.nav
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.2 }}
      role="menu"
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="flex flex-col gap-5 items-end">
        {MENU_OPTIONS.sort(sortAscending).map((menuItem: MenuItem) => (
          <li key={menuItem.id}>
            <a
              href={menuItem.url}
              title={menuItem.name}
              onClick={handleOnClick}
              className="relative text-xl hover:no-underline after:absolute after:right-0 after:-bottom-[3px] after:h-[2px] after:w-0 after:bg-current after:transition-width after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {menuItem.name}
            </a>
          </li>
        ))}
      </ul>
    </m.nav>
  )

  const backMenu = (
    <m.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      onClick={(e) => e.stopPropagation()}
      className="flex justify-end"
    >
      <a
        href={SITE_ROUTES.home}
        title={SITE_STRINGS.backToMainPageTitle}
        className="icon-link-btn flex items-center gap-2"
        onClick={handleBackClick}
      >
        <BsArrowReturnLeft className="text-xl" />
        <span>{SITE_STRINGS.backToMainText}</span>
      </a>
    </m.div>
  )

  const content = pathname === SITE_ROUTES.projects ? backMenu : mainMenu

  if (MENU_OPTIONS.length === 0) {
    return null
  }

  return <LazyMotion features={domAnimation}>{content}</LazyMotion>
}

export default Menu
