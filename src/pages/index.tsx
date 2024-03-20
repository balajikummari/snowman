import ThemeSwitcher from 'components/ThemeSwitcher'
import ToolsCard from 'components/ToolsCard'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Head>
        <title>Snowflake Tools</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="mt-4 flex w-full flex-row justify-end px-20"></div>
        <div className="absolute top-0 right-0 left-0 -z-10 flex h-4/6 w-full flex-col items-center justify-around bg-hero-bg bg-cover"></div>
        <div className="flex w-full flex-col items-center justify-center p-20">
          <h1 className="mt-20 text-8xl font-bold text-white">
            Snowflake Tools
          </h1>

          <p className="mt-10 text-2xl font-bold text-white">
            Best Tools on the internet to manage your Snowflake Databases
          </p>

          <div className="mt-40 flex max-w-4xl flex-row items-center justify-around gap-5 sm:w-full">
            <Link passHref href="/calculator">
              <ToolsCard
                title="Pricing Calculator"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-15 w-15"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
            </Link>
            <Link passHref href="/migrator">
              <ToolsCard
                title="Code Promoter"
                description="Migrate your Snowflake databases to other databases in a few clicks"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-15 w-15"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                }
                uri="https://images.unsplash.com/photo-1591808216268-ce0b82787efe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
              />
            </Link>
            <Link passHref href="/security-manager">
              <ToolsCard
                title="Security Manager"
                description="Security Manager is a tool to manage your Snowflake database's Users and Roles"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-15 w-15"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                }
                uri="https://images.unsplash.com/photo-1581092919535-7146ff1a590b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              />
            </Link>
            <Link passHref href="#">
              <ToolsCard
                soon={true}
                title="Data Migrator"
                description="Migrate any traditional databases to Snowflake"
                icon={
                  <svg
                    className="h-15 w-15"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                    />
                  </svg>
                }
                uri="https://images.unsplash.com/photo-1462040015891-7c792246b10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
              />
            </Link>
          </div>
          <div className="flex w-full flex-col items-center py-10 text-md">
            <div className="flex justify-center gap-5 p-10 text-md">
              <Link href="#">Feature Requests</Link>
              <Link href="#">Roadmap</Link>
              <Link href="#">Contact Us</Link>
            </div>
            <div>Developed By Technovert Solutions</div>
            <div>Snowflake Partner</div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
