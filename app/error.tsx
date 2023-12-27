'use client'

import React, { FunctionComponent } from 'react'

interface ErrorProps {
  error: Error
  resetErrorBoundary: () => void
}

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
