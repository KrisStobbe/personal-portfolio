import React, { FunctionComponent } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

interface LoaderProps {
  textClassNames?: string
}

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
