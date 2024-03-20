import Breadcrumbs from 'components/Breadcrumbs'
import ButtonPrimary from 'components/ButtonPrimary'
import HistoryCard from 'components/HistoryCard'

import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import Head from 'next/head'

//function to send delete api call for form axios
const deleteForm = async (formId: string) => {
  //use axios to send delete request
  await axios.delete(`/api/forms/${formId}`)
}

const logos: any = {
  Azure: (
    <Image
      alt="Microsoft Azure Logo"
      src="/Microsoft_Azure.svg"
      height={40}
      width={40}
    />
  ),
  AWS: (
    <Image
      alt="Amazon Web Services Logo"
      src="/Amazon_Web_Services_Logo.svg"
      height={40}
      width={40}
    />
  ),
  GCP: (
    <Image
      alt="Google Cloud Platform Logo"
      src="/Google-cloud-platform.svg"
      height={40}
      width={40}
    />
  ),
}

const Calculator: NextPage = () => {
  const [fingerprint, setFingerprint] = React.useState('')
  const [mountFlag, setMountFlag] = React.useState(false)
  const [history, setHistory] = React.useState<Array<any> | null>(null)
  const [refetchHistory, setRefetchHistory] = React.useState(false)

  useEffect(() => {
    const fetchHistory = async () => {
      fetch(`api/fingerprints/${fingerprint}`)
        .then((res) => res.json())
        .then((data) => {
          setHistory(data)
          //alert(JSON.stringify(data))
        })
    }
    if (fingerprint !== '') {
      fetchHistory()
    }
  }, [fingerprint, refetchHistory])

  useEffect(() => {
    setMountFlag(true)
    const fpPromise = FingerprintJS.load()
    ;(async () => {
      // Get the visitor identifier when you need it.
      const fp = await fpPromise
      const result = await fp.get()
      return result.visitorId
    })()
      .then((f) => {
        console.log('printed the finger')
        setFingerprint(f)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <Head>
        <title>Price Estimator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {fingerprint && mountFlag ? (
        <div className="flex w-full flex-col items-start">
          {/* <div className="text-lg font-bold">fingerprint : {fingerprint}</div> */}

          <div className="flex h-3/6 w-full flex-col items-start justify-center bg-calculate-bg bg-cover p-20">
            <div className="flex w-full flex-row items-center justify-between">
              <Breadcrumbs />
            </div>

            <div className="mt-20 w-full ">
              <h1 className="text-4xl font-bold text-white">
                Snowflake Price Estimator
              </h1>
            </div>
            <div className="mt-10 w-full ">
              <p className="text-2xl text-white">
                Estimate the cost of running Snowflake with various Cloud
                Providers.
              </p>
            </div>
            <Link
              passHref
              href="/"
              className="mt-10 flex w-full flex-row items-center text-lg text-white underline"
            >
              <div>
                Get Experts Help
                <span className="mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </Link>
            <div className="mt-24 w-full px-20 text-center">
              <Link passHref href="/calculator/estimate">
                <ButtonPrimary
                  label="New Estimate"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col items-center sm:w-full">
            <div className="mt-10 flex w-full flex-col px-20">
              <div className="text-left text-4xl font-bold">
                Previous Estimates
              </div>

              <div className="my-10 flex w-full flex-col items-center justify-center">
                {history != null ? (
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 2xl:grid-cols-3">
                    {history.length > 0 ? (
                      history.map((h) => (
                        <Link
                          passHref
                          key={h['FORMID']}
                          href={`/calculator/estimate?key=${h['FORMID']}`}
                        >
                          <HistoryCard
                            priceHistory={h['FORMDATA']?.['totalCost']}
                            icon={logos[h['FORMDATA']?.['provider']]}
                            title={
                              h['FORMDATA']?.['name']
                                ? h['FORMDATA']?.['name']
                                : 'Untitled Estimate'
                            }
                            description={`Estimation by ${
                              h['FORMDATA']?.['estimationBy']
                                ? h['FORMDATA']?.['estimationBy']
                                : 'Unknown'
                            } for ${
                              h['FORMDATA']?.['estimationFor']
                                ? h['FORMDATA']?.['estimationFor']
                                : 'Unknown'
                            } on ${h['FORMDATA']?.['provider']} - ${
                              h['FORMDATA']?.['region']
                                ? h['FORMDATA']?.['region']
                                : 'Unknown Region'
                            }`}
                            when={h['FORMDATA']?.['updatedAt']}
                            onDelete={(e) => {
                              e.preventDefault()
                              deleteForm(h['FORMID']).then(() =>
                                setRefetchHistory(!refetchHistory)
                              )
                            }}
                          />
                        </Link>
                      ))
                    ) : (
                      <div className="inline-block">
                        You don&apos;t have any previous estimates.
                        <span> </span>
                        <Link
                          passHref
                          href="/calculator/estimate"
                          className="text-primary"
                        >
                          Click here to create a new one
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <>Loading</>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen animate-pulse flex-row items-center justify-center space-x-2 text-2xl">
          <span className="font-semibold text-primary">Loading</span>
        </div>
      )}
    </>
  )
}
export default Calculator
