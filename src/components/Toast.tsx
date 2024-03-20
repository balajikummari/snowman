import React from 'react'

interface ToastProps {
  message: string
  variant: string
}
const Toast = ({ message, variant }: ToastProps) => {
  return (
    <div
      className={`${variant == '' ? 'hidden' : ''} toast toast-end w-auto p-2`}
    >
      <div className={`alert alert-${variant}`}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  )
}

export default Toast
