import { useEffect, useState } from 'react'

/**
 * Custom hook that provides smooth scrolling functionality with responsive offset handling.
 * Adjusts scroll offset based on screen size to account for fixed navigation.
 * 
 * @returns {Object} An object containing the scrollToEl function
 * @returns {Function} scrollToEl - Function to handle smooth scrolling to an element
 * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e - The click event from the anchor element
 */
export function useScrollTo() {
  /** Height of the navigation bar for desktop view */
  const navigationHeight = 80
  /** State to store the current navigation height based on screen size */
  const [height, setHeight] = useState<number>(navigationHeight)

  useEffect(() => {
    /**
     * Handles window resize events to update navigation height
     * Sets height to 56px for mobile screens (max-width: 480px)
     * Sets height to navigationHeight for larger screens
     */
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

  /**
   * Scrolls to the target element with smooth animation
   * Accounts for fixed navigation height in the scroll offset
   * 
   * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e - The click event from the anchor element
   */
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
