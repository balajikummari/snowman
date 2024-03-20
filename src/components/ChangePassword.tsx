import axios from 'axios'
import React, { useState } from 'react'
import Toast from './Toast'

interface ChangePasswordProps {
  email: any
}

const ChangePassword = ({ email }: ChangePasswordProps) => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('')
  const clearToast = () => {
    setToastMessage('')
    setToastType('')
  }
  return (
    <form
      className="m-4 flex w-96 flex-col justify-center rounded "
      onSubmit={async (e) => {
        e.preventDefault()
        e.stopPropagation()
        // Password Must be at least 8 characters long, contain at least 1 digit, 1 uppercase letter and 1 lowercase letter
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword)) {
          if (newPassword !== confirmNewPassword) {
            setToastMessage('Passwords do not match')
            setToastType('warning')
            setTimeout(clearToast, 3000)
            return
          }
          if (password === newPassword) {
            setToastMessage('You cannot use old password again')
            setToastType('warning')
            setTimeout(clearToast, 3000)
            return
          }
          const res = await axios.put(`api/users/changePassword`, {
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              userEmail: email,
              userPassword: password,
              newPassword: newPassword,
            },
          })
          if (res.status == 200) {
            setToastMessage('Password changed successfully')
            setToastType('success')
            setPassword('')
            setConfirmNewPassword('')
            setNewPassword('')
            setTimeout(clearToast, 6000)
            return
          } else if (res.status == 400) {
            setToastMessage('Please enter correct pasword')
            setToastType('error')
            setPassword('')
            setTimeout(clearToast, 3000)
            return
          } else {
            setToastMessage('Something is wrong.Password could not be changed')
            setToastType('error')
            setPassword('')
            setTimeout(clearToast, 3000)
            return
          }
        } else {
          setToastMessage(
            'Enter stronger password. Password Must be at least 8 characters long, contain at least 1 digit, 1 uppercase letter and 1 lowercase letter'
          )
          setToastType('info')
          setTimeout(clearToast, 6000)
          return
        }
      }}
    >
      <Toast message={toastMessage} variant={toastType} />
      <div className="mb-6">
        <label
          className="text-grey-darker mb-2 block text-sm font-bold"
          htmlFor="password"
        >
          Current Password
        </label>
        <input
          className="text-grey-darker w-full appearance-none rounded border bg-transparent py-2 px-3 shadow"
          name="password"
          id="password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label
          className="text-grey-darker mb-2 block text-sm font-bold"
          htmlFor="newPassword"
        >
          <div className="flex flex-row items-center justify-between">
            <div>Enter New Password</div>

            <div
              className="tooltip"
              data-tip="Password must be at least 8 characters long, contain at least 1 digit, 1 uppercase letter and 1 lowercase letter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </label>
        <input
          className="border-red text-grey-darker mb-3 w-full appearance-none rounded border bg-transparent py-2 px-3 shadow"
          name="newPassword"
          id="newPassword"
          type="password"
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label
          className="text-grey-darker mb-2 block text-sm font-bold"
          htmlFor="confirmNewPassword"
        >
          Confirm New Password
        </label>
        <input
          className={`text-grey-darker mb-3 w-full appearance-none rounded border bg-transparent py-2 px-3 shadow`}
          name="confirmNewPassword"
          id="confirmNewPassword"
          type="password"
          value={confirmNewPassword}
          required
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <div hidden={true}></div>
      <button
        className="btn rounded border-0 bg-primary py-2 px-4 font-bold text-white outline-none hover:bg-secondary"
        type="submit"
      >
        Change password
      </button>
    </form>
  )
}

export default ChangePassword
