import React, { FunctionComponent } from 'react'
import { Loader } from 'components'

/**
 * Interface defining the props for the Loading component
 * @interface LoadingProps
 */
interface LoadingProps {}

/**
 * Loading component that displays a centered loading indicator.
 * 
 * @component
 * @example
 * ```tsx
 * <Loading />
 * ```
 * 
 * @returns {JSX.Element} A centered loading indicator component
 */
const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <div className="flex-center">
      <Loader textClassNames="text-2xl text-center" />
    </div>
  )
}

export default Loading
