import React from 'react'
interface OutputBoxProps {
  name: string
  children: React.ReactNode
  staticValue?: boolean
}
const OutputBox = ({ name, children, staticValue = false }: OutputBoxProps) => {
  return (
    <div
      className={`${
        staticValue
          ? 'border-hidden bg-neutral'
          : 'border-secondary bg-secondary '
      } w-48 justify-between rounded border bg-opacity-10 py-2 text-center sm:w-80`}
    >
      <span className="text-md font-semibold text-primary">{children}</span>
    </div>
  )
}

export default OutputBox
