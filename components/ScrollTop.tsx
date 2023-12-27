'use client'

import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { useScrollTo } from 'hooks'
import { IoIosArrowDropup } from 'react-icons/io'

const ScrollTop: FunctionComponent = () => {
  const { scrollToEl } = useScrollTo()

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    scrollToEl(e)
  }

  return (
    <Link
      href="#header"
      onClick={onClick}
      aria-label="Scroll to top"
      className="relative flex group"
    >
      <div>
        <IoIosArrowDropup size={28} />
        <span
          className="group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-gray-800 text-sm text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 mt-3 mx-auto px-2 w-max"
        >
          Scroll to top
        </span>
      </div>
    </Link>
  )
}

export default ScrollTop
