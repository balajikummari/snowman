import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.['email']} <br />
        {/* {alert(session?.user?.email + 'You are signed in')} */}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
