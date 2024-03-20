import { useState } from 'react'
import { ChangeEventHandler } from 'react'

interface RadioGroupProps {
  selected?: string
  options: Array<string>
  icons?: { [key: string]: React.ReactNode }
  name: string
  onSelect?: (value: any) => any
}
const RadioGroup = ({
  selected,
  options,
  name,
  icons,
  onSelect,
}: RadioGroupProps) => {
  const handleSelect = (value: string): any => {
    onSelect && onSelect(value)
  }
  return (
    <>
      {options.map((option) => (
        <div
          key={option}
          className="card m-2 flex flex-row items-center rounded bg-base-100 p-4 shadow-lg hover:shadow-secondary"
        >
          <label
            htmlFor={option}
            className=" flex w-full cursor-pointer flex-row items-center justify-between"
          >
            <div className="flex flex-row items-center">
              <div className="text-center">{icons ? icons[option] : null}</div>
              <div className="px-5 text-center font-semibold">
                {option === 'AWS'
                  ? 'Amazon Web Services'
                  : option === 'Azure'
                  ? 'Microsoft Azure'
                  : option === 'GCP'
                  ? 'Google Cloud Platform'
                  : option}
              </div>
            </div>
            <div>
              <input
                type="radio"
                name={name}
                value={option}
                checked={selected === option}
                className="radio border border-primary checked:bg-primary"
                onChange={onSelect}
              />
            </div>
          </label>
        </div>
      ))}
    </>
  )
}

export default RadioGroup
