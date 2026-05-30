/**
 * Shared Framer Motion variants used across the site for simple fade
 * in/out transitions. Centralising these keeps the look-and-feel consistent.
 */

/** Initial animation state: fully transparent. */
export const initial = { opacity: 0 }

/** Target animation state: fully opaque. */
export const animate = { opacity: 1 }

/** Exit animation state: fade back to transparent. */
export const exit = { opacity: 0 }

/** Default transition: slight delay so animations chain after layout settles. */
export const transition = { delay: 0.75 }
