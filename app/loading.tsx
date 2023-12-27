import React, { FunctionComponent } from 'react'
import { Loader } from 'components'

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <div className="flex-center">
      <Loader textClassNames="text-2xl text-center" />
    </div>
  )
}

export default Loading
