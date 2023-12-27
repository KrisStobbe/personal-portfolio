import { useCallback, useEffect, useState } from 'react'

// Define the types for function parameters and return value
export const useMediaQuery = (
  matchMediaQuery: string = 'max-width: 767px',
): boolean => {
  const [targetReached, setTargetReached] = useState<boolean>(false)

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
