'use client'

import React, { useEffect, useState, FunctionComponent } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { HiMenu } from 'react-icons/hi'
import { FiX } from 'react-icons/fi'
import { ConnectMedia, Menu } from 'components'
import { m, AnimatePresence, domAnimation, LazyMotion } from 'framer-motion'

export const MobileMenu: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  return (
    <LazyMotion features={domAnimation}>
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="w-9 h-9 inline-flex items-center justify-center rounded-md hover:bg-cobalt-700/10 dark:hover:bg-cobalt-400/10 transition-colors"
      >
        <HiMenu size={22} />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <LazyMotion features={domAnimation}>
                <m.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={onClose}
                  className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
                  aria-hidden="true"
                />
                <m.aside
                  key="panel"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.28, ease: [0.17, 0.55, 0.55, 1] }}
                  className="fixed top-0 right-0 z-[110] h-[100dvh] w-[min(320px,85vw)] bg-brand-light dark:bg-brand-dark border-l border-cobalt-700/15 dark:border-cobalt-400/15 shadow-2xl flex flex-col"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation menu"
                >
              <header className="flex items-center justify-between px-5 py-4 border-b border-cobalt-700/15 dark:border-cobalt-400/15">
                <span className="text-[11px] uppercase tracking-[0.22em] font-semibold opacity-60">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md hover:bg-cobalt-700/10 dark:hover:bg-cobalt-400/10 transition-colors"
                >
                  <FiX size={22} />
                </button>
              </header>

              <div className="px-6 py-8">
                <Menu onClick={onClose} />
              </div>

              <div className="mt-auto px-6 py-5 border-t border-cobalt-700/15 dark:border-cobalt-400/15 flex flex-col gap-4">
                <Link
                  href="/assets/resume/kristoffer-stobbe-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="btn w-full"
                >
                  View resume ↗
                </Link>
                <ConnectMedia />
              </div>
                </m.aside>
              </LazyMotion>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </LazyMotion>
  )
}

export default MobileMenu
