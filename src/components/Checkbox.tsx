import React from 'react'

interface CheckboxProps {
  label: string
}

const Checkbox = ({ label }: CheckboxProps) => {
  return (
    <label className="flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="checkbox checkbox-primary checkbox-sm"
      />
      <span className="mx-2 font-medium">Checkbox</span>
    </label>
  )
}

export default Checkbox
