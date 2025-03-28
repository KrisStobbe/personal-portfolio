import React, { FunctionComponent } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

/**
 * Interface defining the props for the Loader component
 * @interface LoaderProps
 */
interface LoaderProps {
  /** Optional CSS classes for text styling */
  textClassNames?: string
}

/**
 * Loader component that displays a centered loading spinner.
 * 
 * @component
 * @example
 * ```tsx
 * <Loader textClassNames="text-2xl text-center" />
 * ```
 * 
 * @param {LoaderProps} props - Component props containing optional text styling
 * @returns {JSX.Element} A centered loading spinner
 */
export const Loader: FunctionComponent<LoaderProps> = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="animate-spin">
        <AiOutlineLoading size={50} />
      </div>
    </div>
  )
}

export default Loader
