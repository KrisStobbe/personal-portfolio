import React, { FunctionComponent } from 'react'

interface IconProps {
  size?: number
  className?: string
  title?: string
}

/**
 * Cursor (the AI code editor) brand mark; its triangular A-frame logo.
 * Inherits `currentColor`; size defaults to 24 to match react-icons.
 */
export const CursorIcon: FunctionComponent<IconProps> = ({
  size = 24,
  className,
  title = 'Cursor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label={title}
    className={className}
  >
    <title>{title}</title>
    <path d="M11.925.027L1.5 6.044v11.912l10.425 6.017 10.425-6.017V6.044L11.925.027zm-.001 2.31l8.426 4.864v9.598l-8.426 4.864-8.426-4.864V7.201l8.426-4.864zm0 2.31L5.5 8.354v7.292l6.424 3.708 6.424-3.708V8.354l-6.424-3.707z" />
  </svg>
)
