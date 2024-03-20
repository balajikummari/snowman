import Breadcrumbs from 'components/Breadcrumbs'
import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

const Calculator: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-base-200">
      <div className="flex w-full flex-col items-start">
        <div className="flex h-3/6 w-full flex-col items-start justify-center bg-security-bg bg-cover px-20 pb-16 pt-10">
          <div className="flex w-full flex-row items-center justify-between">
            <Breadcrumbs />
          </div>

          <div className="mt-10 w-full ">
            <h1 className="text-4xl font-bold text-white">
              Snowflake Security Manager
            </h1>
          </div>
          <div className="mt-5 w-full ">
            <p className="text-lg text-white">
              Manage users and roles in your Snowflake database
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center sm:w-full">
          <div className="mt-10 flex w-full flex-col px-20">
            {/* 2x2 grid of tools */}
            <div className="grid grid-cols-2 gap-96">
              <Link passHref href="/security-manager/users">
                <div className="card cursor-pointer rounded">
                  <div className="card-body bg-base-100">
                    <div className="card-title flex items-center justify-center">
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
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span className="text-lg font-bold">User Manager</span>
                    </div>
                  </div>
                </div>
              </Link>
              <Link passHref href="/security-manager/roles">
                <div className="card cursor-pointer rounded">
                  <div className="card-body bg-base-100">
                    <div className="card-title flex items-center justify-center">
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
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                      <span className="text-lg font-bold">Role Manager</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Calculator
