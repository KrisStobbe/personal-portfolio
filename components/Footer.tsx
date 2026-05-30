'use client'

import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { ConnectMedia } from './ConnectMedia'

/** Primary in-page navigation links shown in the footer. */
const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Stack', href: '#tech' },
]

/**
 * External / contact links shown in the footer's "Connect" column.
 * `external: true` opens the link in a new tab with safe rel attributes.
 */
const CONTACT_LINKS = [
  {
    name: 'Email',
    href: 'mailto:krisstobbe10@gmail.com',
    external: false,
  },
  {
    name: 'LinkedIn ↗',
    href: 'https://www.linkedin.com/in/krisstobbe',
    external: true,
  },
  {
    name: 'GitHub ↗',
    href: 'https://github.com/KrisStobbe',
    external: true,
  },
  {
    name: 'Resume ↗',
    href: '/assets/resume/kristoffer-stobbe-resume.pdf',
    external: true,
  },
]

/**
 * Internal helper that renders a styled footer link. When `external` is
 * `true`, opens in a new tab with `rel="noopener noreferrer"`.
 *
 * @param props.href - Link destination URL
 * @param props.external - Whether the link should open in a new tab
 * @param props.children - Link label
 */
const TextLink = ({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: React.ReactNode
}) => (
  <Link
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="text-sm opacity-75 hover:opacity-100 hover:text-cobalt-700 dark:hover:text-cobalt-400 transition-colors"
  >
    {children}
  </Link>
)

/**
 * Site-wide footer rendered at the bottom of every page.
 *
 * Includes a short bio, primary navigation, contact links, social icons,
 * and a copyright line whose year is computed at render time.
 *
 * @returns {JSX.Element} The animated footer element.
 */
export const AppFooter: FunctionComponent = () => {
  /** Current year, recomputed each render for the copyright line. */
  const year = new Date().getFullYear()

  return (
    <LazyMotion features={domAnimation}>
      <m.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: [0.17, 0.55, 0.55, 1] }}
        className="container-md mt-20"
        role="contentinfo"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-cobalt-700/40 dark:via-cobalt-400/40 to-transparent" />

        <div className="grid gap-12 md:grid-cols-12 py-12">
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link
              href="#header"
              className="inline-flex flex-col gap-1 group max-w-fit"
              aria-label="Back to top"
            >
              <span className="text-lg font-semibold tracking-tight group-hover:text-cobalt-700 dark:group-hover:text-cobalt-400 transition-colors">
                Kristoffer Stobbe
              </span>
              <span className="text-[10.5px] uppercase tracking-[0.22em] opacity-55 font-medium">
                Senior Software Engineer
              </span>
            </Link>
            <p className="text-sm opacity-65 leading-relaxed max-w-md">
              Building thoughtful, scalable systems out of Austin, TX.
              Open to conversations about interesting
              technical problems.
            </p>
          </div>

          <nav
            aria-label="Site navigation"
            className="md:col-span-3 flex flex-col gap-3"
          >
            <h3 className="text-[11px] uppercase tracking-[0.22em] font-semibold opacity-55">
              Site
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <TextLink href={link.href}>{link.name}</TextLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4 flex flex-col gap-3">
            <h3 className="text-[11px] uppercase tracking-[0.22em] font-semibold opacity-55">
              Connect
            </h3>
            <ul className="flex flex-col gap-2.5">
              {CONTACT_LINKS.map((link) => (
                <li key={link.href}>
                  <TextLink href={link.href} external={link.external}>
                    {link.name}
                  </TextLink>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <ConnectMedia />
            </div>
          </div>
        </div>

        <div className="border-t border-cobalt-700/10 dark:border-cobalt-400/10 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs opacity-55">
          <p>© {year} Kristoffer Stobbe. All rights reserved.</p>
        </div>
      </m.footer>
    </LazyMotion>
  )
}

export default AppFooter
