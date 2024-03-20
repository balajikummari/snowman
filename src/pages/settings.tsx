import type { NextPage } from 'next'
import Head from 'next/head'
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { getCredentialsFromSF } from 'src/lib/functions/snowflake-credentials'
import Breadcrumbs from 'components/Breadcrumbs'
import CredentialManager from 'components/CredentialManager'
import AccountCenter from 'components/AccountCenter'

const Home: NextPage = ({ credentialsList, email }: any) => {
  const { data: session, status } = useSession()
  const [choice, setChoice] = React.useState('Account center')

  if (status === 'authenticated') {
    return (
      <div className="flex min-h-screen flex-col items-center bg-base-200">
        <Head>
          <title>Settings</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex w-full flex-col">
          <div className="drawer drawer-mobile w-full">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ml-8 flex flex-col gap-4 p-8">
              <Breadcrumbs />
              {choice == 'Snowflake Credentials' ? (
                <CredentialManager
                  email={email}
                  credentialsList={credentialsList}
                />
              ) : choice == 'Account center' ? (
                <AccountCenter email={email} />
              ) : (
                <>Comin Soon !!!</>
              )}
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button sm:hidden"
              >
                Open drawer
              </label>
            </div>
            <div className="drawer-side shadow-2xl">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <ul className="w-22 menu h-screen gap-5 overflow-y-auto p-4 text-base-content">
                <li>
                  <button
                    onClick={() => setChoice('Account center')}
                    // focus if selected
                    className={`${
                      choice === 'Account center' ? 'bg-secondary' : ''
                    }`}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {/* <div>Account Center</div> */}
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setChoice('Snowflake Credentials')}
                    className={`${
                      choice === 'Snowflake Credentials' ? 'bg-secondary' : ''
                    }`}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                        />
                      </svg>
                      {/* <div>Credentials Manager</div> */}
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Head>
        <title>Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        Not Signed in
      </main>
    </div>
  )
}
export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  const email = session?.user?.email
  if (!email) {
    return {
      props: {
        credentialsList: null,
      },
    }
  }
  // get user
  return {
    props: {
      credentialsList: await getCredentialsFromSF(email),
      email: email,
    },
  }
}
export default Home
