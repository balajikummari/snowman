import { signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Toast from 'components/Toast'
export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('')
  const clearToast = () => {
    setToastMessage('')
    setToastType('')
  }
  const router = useRouter()
  const session = useSession()
  const status = session.status
  const callbackUrl = router.query.callbackUrl
  if (status === 'authenticated') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-base-200">
        <p>You are already signed in</p>
        <Link
          passHref
          href={(callbackUrl as string) || '/'}
          className="btn btn-ghost text-primary underline hover:bg-transparent"
        >
          Continue
        </Link>
      </div>
    )
  }
  return (
    <div className="flex min-h-screen flex-col items-center bg-base-200">
      <form
        className="m-4 flex w-96 flex-col rounded bg-base-100 px-8 pt-6 pb-8 shadow-md"
        onSubmit={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          // Password Must be at least 8 characters long, contain at least 1 digit, 1 uppercase letter and 1 lowercase letter
          if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
            // alert('success')
            if (password !== confirmPassword) {
              setToastMessage('Passwords do not match')
              setToastType('warning')
              setTimeout(clearToast, 3000)
              return
            }
            const userEmail = await axios.get(`api/users/${email}`)
            if (userEmail.status === 204) {
              try {
                const res = await axios.post('/api/users/signUp', {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  data: {
                    userEmail: email,
                    userPassword: password,
                  },
                })
                if (res.status === 201) {
                  setToastMessage('User signed up successfully')
                  setToastType('success')
                  setTimeout(clearToast, 3000)
                  signIn('credentials', {
                    email: email,
                    password: password,
                    callbackUrl: (callbackUrl as string) || '/',
                  })
                }
              } catch (e) {
                setToastMessage(e as string)
                setToastType('error')
                setTimeout(clearToast, 3000)
                return
              }
            } else {
              setToastMessage('This email is taken')
              setToastType('warning')
              setTimeout(clearToast, 3000)
              return
            }
            // sign in
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
        <div className="mb-6">
          <label
            className="text-grey-darker mb-2 block text-sm font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="text-grey-darker w-full appearance-none rounded border bg-transparent py-2 px-3 shadow"
            name="email"
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            className="text-grey-darker mb-2 block text-sm font-bold"
            htmlFor="password"
          >
            <div className="flex flex-row items-center justify-between">
              <div>EnterPassword</div>
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
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <input
            className={`text-grey-darker mb-3 w-full appearance-none rounded border bg-transparent py-2 px-3 shadow`}
            name="confirm-password"
            id="confirm-password"
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="btn rounded border-0 bg-primary py-2 px-4 font-bold text-white outline-none hover:bg-secondary"
          type="submit"
        >
          Sign Up
        </button>
        <Link
          passHref
          href="/signin"
          className="btn btn-ghost text-primary underline hover:bg-transparent"
        >
          Sign in instead
        </Link>
      </form>
      <Toast message={toastMessage} variant={toastType} />
    </div>
  )
}

// This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   }
// }

// SignIn.getInitialProps = async (context) => {
//   return {
//     csrfToken: await getCsrfToken(context),
//   }
// }
