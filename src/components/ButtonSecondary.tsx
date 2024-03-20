import React from 'react'

interface ButtonProps {
  label: string
  icon?: any
  onClick?: () => void
}
const ButtonSecondary = ({ label, icon, onClick }: ButtonProps) => {
  return (
    <button
      style={{ textTransform: 'none' }}
      className="btn btn-outline btn-primary flex w-auto flex-row flex-wrap overflow-hidden border p-2 text-md font-semibold"
      type="submit"
      onClick={onClick}
    >
      <div>{icon}</div>

      <div>{label}</div>
    </button>
  )
}

export default ButtonSecondary
