import { InitialValuesInterface } from './../../components/InitialValuesInterface'

import type { NextPage } from 'next'
import Form from 'components/Form'
import Breadcrumbs from 'components/Breadcrumbs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import uniqid from 'uniqid'
import React from 'react'
import { SectionInterface } from 'components/SectionInterface'
import { getFormsFromSF, saveFormToSF } from 'src/lib/functions/snowflake-forms'
import Head from 'next/head'

const defaultInitialValues: InitialValuesInterface = {
  name: '',
  formId: '',
  fingerprint: '',
  estimationBy: 'Technovert',
  estimationFor: '',
  provider: 'Azure',
  region: '',
  size: '',
  edition: '',
  editable: ['on'],
  sections: [] as SectionInterface[],
  totalCost: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
const Estimate: NextPage = ({ form }: any) => {
  const [assignFingerprint, setAssignFingerprint] = React.useState(false)
  const router = useRouter()
  useEffect(() => {
    if (
      router !== undefined &&
      router.query !== undefined &&
      router.query.key === undefined &&
      !router.asPath.includes('?key=')
    ) {
      router.push({ query: { key: uniqid() } })
    }
  }, [router])

  const [fingerprint, setFingerprint] = React.useState('')

  useEffect(() => {
    console.log('FingerprintJS loaded')
    const fpPromise = FingerprintJS.load()
    ;(async () => {
      // Get the visitor identifier when you n  eed it.
      const fp = await fpPromise
      const result = await fp.get()
      return result.visitorId
    })()
      .then((f) => {
        console.log('gingerprint  :  ' + f)
        setFingerprint(f)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (fingerprint !== '' && typeof form[0] !== 'undefined') {
      if (form[0]['FORMDATA']['fingerprint'] === '')
        form[0]['FORMDATA']['fingerprint'] = fingerprint
      setAssignFingerprint(true)
    }
  }, [fingerprint, form])

  return (
    <>
      <Head>
        <title>Price Estimator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto">
        {/* <div className="text-lg">fingerprint:{fingerprint}</div> */}
        {router.asPath.includes('?key=') && assignFingerprint ? (
          <div className=" mt-4">
            <Breadcrumbs />
            <div className="py-4 text-left text-xl font-bold text-primary">
              Snowflake Pricing Estimator
            </div>
            <Form initialValues={form[0]['FORMDATA']} />
          </div>
        ) : (
          <div className="flex h-screen animate-pulse flex-row items-center justify-center space-x-2 text-2xl">
            <span className="font-semibold text-primary">Loading</span>
          </div>
        )}
      </main>
    </>
  )
}
export default Estimate

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  // get form id from url
  const formId = context.query.key

  if (typeof formId == 'undefined') return { props: { form: [] } }

  const matchedForm = await getFormsFromSF(formId)

  if (matchedForm.length === 0) {
    // create new form if not found amd post it
    defaultInitialValues.formId = formId
    defaultInitialValues.createdAt = new Date().toISOString()
    defaultInitialValues.updatedAt = new Date().toISOString()
    defaultInitialValues.editable = ['on']
    const newForm = defaultInitialValues

    if (typeof formId !== 'undefined') {
      await saveFormToSF(formId, '', newForm)
    }

    return {
      props: {
        form: [{ FORMDATA: defaultInitialValues }],
      },
    }
  }

  // Pass data to the page via props
  return { props: { form: matchedForm } }
}
