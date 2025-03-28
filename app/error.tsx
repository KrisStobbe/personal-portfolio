'use client'

import React, { FunctionComponent } from 'react'

/**
 * Interface defining the props for the Error component
 * @interface ErrorProps
 */
interface ErrorProps {
  /** The error object containing error details */
  error: Error
  /** Function to reset the error boundary state */
  resetErrorBoundary: () => void
}

/**
 * Error component that displays error messages and provides recovery options.
 * 
 * @component
 * @example
 * ```tsx
 * <Error 
 *   error={new Error('Something went wrong')} 
 *   resetErrorBoundary={() => console.log('Reset clicked')} 
 * />
 * ```
 * 
 * @param {ErrorProps} props - Component props containing error details and reset function
 * @returns {JSX.Element} An error display component with recovery options
 */
const Error: FunctionComponent<ErrorProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="h-full w-full flex-center flex-col gap-5">
      <p className="text-3xl text-red-500">Something went wrong!</p>
      <p className="text-red-500">{error.toString()}</p>
      <button className="btn" onClick={resetErrorBoundary}>
        {'Try again'}
      </button>
    </div>
  )
}

export default Error
