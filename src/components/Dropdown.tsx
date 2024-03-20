import React, { useEffect } from 'react'

interface DropdownProps {
  size: 'small' | 'large'
  options?: Array<string> | null
  selected?: string
  name: string
  editable: boolean
  reset?: () => void
  onSelect?: (value: any) => any
  defaultOption?: string
}

const Dropdown = ({
  size,
  options,
  selected,
  editable,
  name,
  onSelect,
  defaultOption = '',
  ...props
}: DropdownProps) => {
  return (
    <div>
      <select
        name={name}
        onChange={onSelect}
        className={`select select-secondary rounded font-medium focus:outline-none ${
          size == 'large' ? 'w-48' : 'w-48'
        } flex items-center justify-between border py-2.5 px-4 sm:w-80`}
        disabled={!editable}
      >
        <option value={selected || ''} label={selected || 'Select'} />
        {options
          ? options.map((option) =>
              option !== selected ? (
                <option className="" key={option} value={option} label={option}>
                  {option}
                </option>
              ) : null
            )
          : null}
      </select>
    </div>
  )
}

export default Dropdown
