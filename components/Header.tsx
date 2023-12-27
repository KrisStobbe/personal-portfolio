'use client'

import React, { FunctionComponent } from 'react'
import { Logo, MobileMenu, ThemeSwitcher } from 'components'

export const AppHeader: FunctionComponent = () => {
  return (
    <header className="pt-5 pb-5 sticky top-0 z-10 bg-inherit shadow-sm">
      <div id="header" className="container-md">
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
