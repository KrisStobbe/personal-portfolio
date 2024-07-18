'use client'

import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useScrollTo } from 'hooks'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { initial, animate, exit, transition } from 'utils'
import { MENU_OPTIONS, SITE_ROUTES, SITE_STRINGS } from '../constants'

interface MenuItem {
  id: string
  url: string
  name: string
}

interface MenuProps {
  onClick?: () => void
}

export const Menu: FunctionComponent<MenuProps> = ({ onClick = () => {} }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { scrollToEl } = useScrollTo()

  const sortAscending = (a: MenuItem, b: MenuItem) => a.id.localeCompare(b.id)

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    scrollToEl(e)
    window.setTimeout(() => onClick(), 350)
  }

  const handleBackClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault()
    onClick()
    setTimeout(() => {
      router.push(SITE_ROUTES.home)
    }, 350)
  }

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
