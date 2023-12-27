'use client'

import React, { FunctionComponent } from 'react'
import { Logo, Menu, ConnectMedia, MobileMenu, ThemeSwitcher } from 'components'
import { useMediaQuery } from 'utils'

export const AppHeader: FunctionComponent = () => {
  const isMobile = useMediaQuery()

  return (
    <header className="pt-5 pb-5 sticky top-0 z-10 bg-inherit shadow-sm">
      <div className="container-md">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-5">
            <ThemeSwitcher />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
