import React from 'react'
interface TextInputProps {
  unit: string
  name: string
  selected: number
  editable: boolean
  placeholder?: string
  onChange?: (value: any) => void
}
const TextInput = ({
  unit,
  onChange,
  selected,
  placeholder,
  name,
  editable,
}: TextInputProps) => {
  return (
    <div className="form-control ">
      <label className="input-group w-48 justify-between rounded border border-secondary bg-base-100 sm:w-80">
        <input
          type="number"
          value={selected || ''}
          placeholder={placeholder}
          name={name}
          className="input w-20 border-0 pr-0 focus:outline-0"
          onChange={onChange}
          disabled={!editable}
          min={0}
        />

        <span className="bg-base-100 text-center opacity-60">{unit}</span>
      </label>
    </div>
  )
}

export default TextInput
