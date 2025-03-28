import { useCallback, useEffect, useState } from 'react'

/**
 * Custom hook that tracks the state of a media query match.
 * Provides a boolean value indicating whether the media query matches.
 * 
 * @param {string} matchMediaQuery - The media query to match against (default: 'max-width: 767px')
 * @returns {boolean} Whether the media query matches the current viewport
 */
export const useMediaQuery = (
  matchMediaQuery: string = 'max-width: 767px',
): boolean => {
  /** State to track whether the media query matches */
  const [targetReached, setTargetReached] = useState<boolean>(false)

  /**
   * Callback function to update the target state when media query matches change
   * @param {MediaQueryListEvent} e - The media query list event
   */
  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    setTargetReached(e.matches)
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(${matchMediaQuery})`)
    // Check if the media query list object supports addEventListener
    if (media.addEventListener) {
      media.addEventListener('change', updateTarget)
    } else {
      // Fallback for older browsers
      media.addListener(updateTarget)
    }

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) setTargetReached(true)

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', updateTarget)
      } else {
        // Fallback for older browsers
        media.removeListener(updateTarget)
      }
    }
  }, [matchMediaQuery, updateTarget])

  return targetReached
}
