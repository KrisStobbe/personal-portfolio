'use client'

import React, { FunctionComponent, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo, MobileMenu, ThemeSwitcher } from 'components'
import { MENU_OPTIONS, SITE_ROUTES } from '../constants'
import { useScrollTo } from 'hooks'
import { BsArrowReturnLeft } from 'react-icons/bs'

/**
 * Shape of a single navigation entry rendered in the header.
 */
interface MenuItem {
  /** Stable identifier used as a React key. */
  id: string
  /** Visible label shown to the user. */
  name: string
  /** In-page anchor or route the link points to. */
  url: string
}

/**
 * Sticky site header containing the logo, primary navigation,
 * a resume link, the theme switcher, and a mobile menu trigger.
 *
 * On the home page it scrolls smoothly between sections and
 * highlights the active section via IntersectionObserver. On other
 * pages it shows a "Back" link to the home route.
 *
 * @returns {JSX.Element} The header element.
 */
export const AppHeader: FunctionComponent = () => {
  /** Current pathname; used to vary header behavior per-route. */
  const pathname = usePathname()
  /** True when the user is on the landing page. */
  const isHome = pathname === SITE_ROUTES.home
  /** Smooth-scroll helper used by anchor clicks. */
  const { scrollToEl } = useScrollTo()
  /** True once the page has been scrolled past the threshold. */
  const [scrolled, setScrolled] = useState(false)
  /** Hash of the section currently in view (e.g. `#about`). */
  const [activeHash, setActiveHash] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    MENU_OPTIONS.forEach((m) => {
      const el = document.querySelector(m.url)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHome])

  /**
   * Intercepts anchor clicks on the home page so we can smooth-scroll
   * to the target section. On non-home routes we let the browser
   * navigate normally.
   *
   * @param e - Click event from the anchor element.
   */
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return
    e.preventDefault()
    scrollToEl(e)
  }

  return (
    <header
      className={`sticky top-0 z-30 transition-colors duration-300 ${
        scrolled
          ? 'bg-brand-light/85 dark:bg-brand-dark/85 backdrop-blur-md border-b border-cobalt-700/10 dark:border-cobalt-400/10'
          : 'bg-transparent border-b border-transparent'
      }`}
      role="banner"
    >
      <div className="container-md">
        <div
          id="header"
          className="flex justify-between items-center h-16 md:h-[68px]"
        >
          <Logo />

          <div className="flex items-center gap-1.5 md:gap-2">
            {isHome && (
              <nav
                aria-label="Primary navigation"
                className="hidden md:flex items-center gap-0.5"
              >
                {MENU_OPTIONS.map((item: MenuItem) => {
                  const active = activeHash === item.url
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      onClick={handleAnchorClick}
                      aria-current={active ? 'page' : undefined}
                      className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        active
                          ? 'text-cobalt-700 dark:text-cobalt-400'
                          : 'opacity-75 hover:opacity-100 hover:text-cobalt-700 dark:hover:text-cobalt-400'
                      }`}
                    >
                      {item.name}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-px h-px bg-cobalt-700 dark:bg-cobalt-400"
                        />
                      )}
                    </a>
                  )
                })}
              </nav>
            )}

            {!isHome && (
              <Link
                href={SITE_ROUTES.home}
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md opacity-75 hover:opacity-100 hover:text-cobalt-700 dark:hover:text-cobalt-400 transition-colors"
                aria-label="Back to home"
              >
                <BsArrowReturnLeft />
                Back
              </Link>
            )}

            {isHome && (
              <Link
                href="/assets/resume/kristoffer-stobbe-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex h-9 items-center px-3.5 text-sm font-medium rounded-md border border-cobalt-700/40 dark:border-cobalt-400/40 hover:border-cobalt-700 dark:hover:border-cobalt-400 hover:bg-cobalt-700/5 dark:hover:bg-cobalt-400/5 transition-colors"
              >
                Resume ↗
              </Link>
            )}

            <div
              aria-hidden="true"
              className="hidden md:block w-px h-5 mx-1.5 bg-cobalt-700/15 dark:bg-cobalt-400/15"
            />

            <ThemeSwitcher />
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
