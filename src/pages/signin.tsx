import { signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Toast from 'components/Toast'
export default function SignIn() {
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
        className="absolute m-4 flex w-96 flex-col rounded bg-base-100 px-8 pt-6 pb-8 shadow-md"
        onSubmit={async (e: any) => {
          e.preventDefault()
          e.stopPropagation()
          const res = await signIn('credentials', {
            email: e.target.email.value,
            password: e.target.password.value,
            callbackUrl: (callbackUrl as string) || '/',
          })
          // const params = new URLSearchParams(window.location.search)
          // if(params.has('error')){
          //   setToastType('warning')
          //   setToastMessage(
          //     "Invalid Login credentials"
          //   )
          //   setTimeout(clearToast, 6000)
          // }
          console.log(res)
          if (res?.error) {
            alert('failed')
            setToastType('warning')
            setToastMessage('Invalid Login credentials')
            setTimeout(clearToast, 6000)
          }
        }}
      >
        <div className="mb-4">
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
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="text-grey-darker mb-2 block text-sm font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border-red text-grey-darker mb-3 w-full appearance-none rounded border bg-transparent py-2 px-3 shadow"
            name="password"
            id="password"
            type="password"
            required
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>

        <button
          className="btn rounded border-0 bg-primary py-2 px-4 font-bold text-white outline-none hover:bg-secondary"
          type="submit"
        >
          Sign In
        </button>

        <Link href="/signUp" passHref>
          <div className="flex flex-row items-center justify-center">
            <div>New here ?</div>
            <span className="btn btn-ghost text-primary underline hover:bg-transparent">
              Create account
            </span>
          </div>
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
