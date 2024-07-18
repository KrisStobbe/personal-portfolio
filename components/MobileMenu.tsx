'use client'

import React, { useEffect, useState, FunctionComponent } from 'react'
import { BsGrid } from 'react-icons/bs'
import { ConnectMedia, Menu } from 'components'
import { m, AnimatePresence, domAnimation, LazyMotion } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'

export const MobileMenu: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  const variants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
  }

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        className="p-2"
        onClick={onOpen}
        title="Open menu"
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ delay: 0.2 }}
      >
        <BsGrid />
      </m.button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            className="fixed inset-0 z-50 backdrop-blur-md"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
          >
            <header className="p-6 flex items-center justify-between border-b border-b-brand-light z-10">
              <ConnectMedia />
              <button
                onClick={onClose}
                className="w-10 h-10 inline-flex items-center justify-center"
              >
                <IoMdClose size={24} />
              </button>
            </header>
            <div className="px-6 py-10">
              <Menu onClick={onClose} />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

export default MobileMenu
