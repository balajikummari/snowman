import React from 'react'

interface ButtonProps {
  label: string
  icon?: any
  onClick?: () => void
}

const ButtonPrimary = ({ label, icon, ...props }: ButtonProps) => {
  return (
    <button
      style={{ textTransform: 'none', color: '#fff', position: 'relative' }}
      className="btn btn-primary btn-lg w-80 rounded-full text-xl font-bold"
    >
      {label}
      <span
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          transform: 'translate(85%,35%)',
        }}
        className=""
      >
        {icon}
      </span>
    </button>
  )
}

export default ButtonPrimary
