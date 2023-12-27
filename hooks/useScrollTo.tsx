import { useEffect, useState } from 'react'

export function useScrollTo() {
  const navigationHeight = 80
  const [height, setHeight] = useState<number>(navigationHeight)

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 480px)').matches) {
        setHeight(56)
      } else {
        setHeight(navigationHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToEl = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const hash = e.currentTarget.hash
    const element = document.querySelector(hash) as HTMLElement | null
    if (element) {
      const offsetTop = element.offsetTop - height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return { scrollToEl }
}
