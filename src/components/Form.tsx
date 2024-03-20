import { useFormik } from 'formik'
import { Key, useEffect, useState } from 'react'
import ComputeCard from './cards/ComputeCard'
import ProviderCard from './cards/ProviderCard'
import { StorageCard } from './cards/StorageCard'
import TransferCard from './cards/TransferCard'
import { BaseConfig } from '../../assets/Models'
import ServerlessFeaturesCard from './cards/ServerlessFeaturesCard'
import SnowpipeCard from './cards/SnowpipeCard'
import SectionSelector from './SectionSelector'
import SummaryCard from './cards/SummaryCard'
import { SectionInterface } from './SectionInterface'
import { TitleCard } from './cards/TitleCard'
import { InitialValuesInterface } from './InitialValuesInterface'
import axios from 'axios'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import x from 'uniqid'

interface FormProps {
  initialValues: InitialValuesInterface
}

const Form = ({ initialValues }: FormProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      console.log(JSON.stringify(values, null, 2))
    },
  })
  const [renderCount, setRenderCount] = useState(0)
  const [collapseAll, setCollapseAll] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [fingerprint, setFingerprint] = useState('')

  useEffect(() => {
    const fpPromise = FingerprintJS.load()
    ;(async () => {
      // Get the visitor identifier when you n  eed it.
      const fp = await fpPromise
      const result = await fp.get()
      return result.visitorId
    })()
      .then((f) => {
        setFingerprint(f)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (fingerprint !== '') {
      if (formik.values.fingerprint === fingerprint) {
        setEditable(true)
        setIsOwner(true)
      }
    }
  }, [fingerprint])

  useEffect(() => {}, [isOwner])

  useEffect(() => {
    // put request to api to save the form
    const formBody = {
      FORMID: formik.values.formId,
      FINGERPRINT: formik.values.fingerprint,
      FORMDATA: formik.values,
    }
    const fetchData = async () => {
      await axios
        .put(`/api/forms/${formik.values.formId}`, formBody)
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
    }
    fetchData()
  }, [formik.values])

  useEffect(() => {
    setRenderCount(renderCount + 1)
  }, [])
  useEffect(() => {
    if (renderCount > 0) {
      formik.setFieldValue('region', '')
      formik.setFieldValue('sections', [] as SectionInterface[])
      formik.setFieldValue('totalCost', 0)
      formik.setFieldValue('size', '')
      formik.setFieldValue('edition', '')
    }
  }, [formik.values.provider])
  useEffect(() => {
    calculateEachCost(formik.values.sections)
    formik.setFieldValue('totalCost', totalSectionCost(formik.values.sections))
  }, [formik.values])

  const pricingData = require('../../assets/SnowflakePricingData.json')

  const handleDelete = (index: number) => {
    const sections = formik.values.sections
    sections.splice(index, 1)
    formik.setFieldValue('sections', sections)
    formik.setFieldValue('totalCost', totalSectionCost(formik.values.sections))
  }
  useEffect(() => {
    if (formik.values.edition == 'VPS') {
      while (
        formik.values.sections.findIndex(
          (section: SectionInterface) => section.service === 'Transfer'
        ) != -1
      ) {
        const index = formik.values.sections.findIndex(
          (section: SectionInterface) => section.service === 'Transfer'
        )
        handleDelete(index)
      }
    }
  }, [formik.values.edition])

  const totalSectionCost = (sections: SectionInterface[]) => {
    return parseFloat(
      sections
        .reduce((acc, section) => {
          return acc + (section.sectionCost || 0)
        }, 0)
        .toFixed(2)
    )
  }

  const calculateTotalComputeCost = (index: number) => {
    const computeCost = calculateComputeCost(index)
    const serviceCost =
      4.4 *
      (formik.values.sections?.[index]?.computeTime || 0) *
      (pricingData['Providers'].find(
        (x: any) => x.id === formik.values.provider
      )?.['Regions']?.[formik.values.region]?.['Compute']?.[
        formik.values.edition
      ] || 0)

    const totalCost =
      serviceCost > 0.1 * computeCost
        ? serviceCost + 0.9 * computeCost
        : computeCost
    return parseFloat(computeCost.toFixed(2))
  }

  const calculateEachCost = (sections: SectionInterface[]) => {
    sections.forEach((section, index) => {
      if (section.service === 'Storage') {
        formik.setFieldValue(
          `sections[${index}].sectionCost`,
          calculateStorageCost(index)
        )
      } else if (section.service === 'Transfer') {
        formik.setFieldValue(
          `sections[${index}].sectionCost`,
          calculateTransferCost(index)
        )
      } else if (section.service === 'Compute') {
        formik.setFieldValue(
          `sections[${index}].sectionCost`,
          calculateTotalComputeCost(index)
        )
      } else if (section.service === 'Serverless Features') {
        formik.setFieldValue(
          `sections[${index}].sectionCost`,
          calculateServerlessCost(index)
        )
      } else if (section.service === 'Snowpipe') {
        formik.setFieldValue(
          `sections[${index}].sectionCost`,
          calculateSnowpipeCost(index)
        )
      }
    })
  }

  const calculateStorageCost = (index: number) => {
    const storageSize = formik.values.sections[index].storageSize
    const paymentMode = formik.values.sections[index].paymentMode
    if (storageSize == null || paymentMode == null) {
      return 0
    }
    const y =
      pricingData['Providers'].find(
        (x: any) => x.id === formik.values.provider
      )?.['Regions']?.[formik.values.region]?.['Storage'] || {}

    if (!y) return 0
    let cost = 0
    if (paymentMode === 'On Demand') {
      cost = y['On Demand Price'] * storageSize
    } else {
      cost = y['Capacity Price'] * storageSize
    }
    return parseFloat(cost.toFixed(2))
  }

  const calculateTransferCost = (index: number) => {
    const destinationCloudProvider =
      formik.values.sections[index].destinationCloudProvider
    const dataSize = formik.values.sections[index].dataSize
    const transferRegion = formik.values.sections[index].transferRegion

    if (
      destinationCloudProvider == null ||
      dataSize == null ||
      transferRegion == null
    ) {
      return 0
    }
    let y: any
    if (destinationCloudProvider) {
      y =
        pricingData['Providers'].find(
          (x: any) => x.id === formik.values.provider
        )?.['Regions']?.[formik.values.region]?.['Transfer']?.[
          destinationCloudProvider
        ] || 0
    }
    let cost = 0
    if (transferRegion === 'Same Region') {
      cost = (y['Same Region'] || 0) * dataSize
    } else if (transferRegion == 'Same Continent') {
      cost = (y['Different Region']?.['Same Continent'] || 0) * dataSize
    } else if (transferRegion == 'Different Continent') {
      cost = (y['Different Region']?.['Different Continent'] || 0) * dataSize
    } else if (transferRegion == 'Oceania') {
      cost =
        (y['Different Region']?.['Oceania'] ||
          y['Different Region']?.['Different Continent']) * dataSize
    }
    return parseFloat(cost.toFixed(2))
  }

  const calculateComputeCost = (index: number) => {
    console.log(formik.values.sections[index])
    const computeSize = formik.values.sections[index].computeSize
    const computeEdition = formik.values.edition
    const computeTime = formik.values.sections[index].computeTime
    if (computeSize == null || computeEdition == null || computeTime == null) {
      return 0
    }
    const costPerCredit =
      pricingData['Providers'].find(
        (x: any) => x.id === formik.values.provider
      )?.['Regions']?.[formik.values.region]?.['Compute']?.[computeEdition] || 0
    const creditsPerHour = pricingData['ComputeSizes']?.[computeSize] || 0
    return parseFloat((creditsPerHour * computeTime * costPerCredit).toFixed(2))
  }
  const calculateSnowpipeCost = (index: number) => {
    const costPerCredit =
      pricingData['Providers'].find(
        (x: any) => x.id === formik.values.provider
      )?.['Regions']?.[formik.values.region]?.['Compute']?.[
        formik.values.edition || ''
      ] || 0
    const numCreditsPerHour = 1.25
    const numHours = formik.values.sections[index].snowpipeComputeTime || 0
    const fileLoadingCredits = parseFloat(
      (
        0.00006 * (formik.values.sections[index].snowpipeNoOfFiles || 0)
      ).toFixed(2)
    )
    const totalCredits = numHours * numCreditsPerHour + fileLoadingCredits
    return parseFloat((costPerCredit * totalCredits).toFixed(2))
  }
  const calculateServerlessCost = (index: number) => {
    const costPerCredit =
      pricingData['Providers'].find(
        (x: any) => x.id === formik.values.provider
      )?.['Regions']?.[formik.values.region]?.['Compute']?.[
        formik.values.edition || ''
      ] || 0
    const computeTime = formik.values.sections[index].serverlessComputeTime || 0
    const serverlessFeature =
      formik.values?.sections[index]?.serverlessFeature || ''
    // console.log(pricingData['ServerlessFeatures'].find((x:any)=>x.feature===serverlessFeature) , "POEUWPIJoJO")
    const creditsPerComputeHour =
      (pricingData['ServerlessFeatures'].find(
        (x: any) => x.feature === serverlessFeature
      )?.['credits']?.['snowflakeManagedCompute'] || 0) +
      (pricingData['ServerlessFeatures'].find(
        (x: any) => x.feature === serverlessFeature
      )?.['credits']?.['cloudServices'] || 0)

    if (
      costPerCredit == null ||
      computeTime == null ||
      serverlessFeature == null
    ) {
      return 0
    }
    return parseFloat(
      (costPerCredit * computeTime * creditsPerComputeHour).toFixed(2)
    )
  }
  const services =
    formik.values.provider && formik.values.region
      ? ['Storage', 'Compute', 'Transfer', 'Serverless Features', 'Snowpipe']
      : []

  const serviceIcons = {
    Storage: (
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
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
    Compute: (
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
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
    Transfer: (
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
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
    'Serverless Features': (
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
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </svg>
    ),
    Snowpipe: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="h-6 w-6"
        viewBox="0 0 16 16"
      >
        <path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z" />
      </svg>
    ),
  }
  const addSection = (service: string) => {
    formik.setFieldValue('sections', [
      ...formik.values.sections,
      {
        service: service,
      },
    ])
  }
  const [editable, setEditable] = useState(formik.values.editable.length > 0)

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      {/* {formik.values.editable ? (
        <div className="flex flex-col">
          {typeof formik.values.editable}
          {console.log(formik.values.editable)}
        </div>
      ) : (
        <div className="flex flex-col">not editable</div>
      )} */}
      <TitleCard
        collapsed={collapseAll}
        key={isOwner ? 'owner' : 'collaborator'}
        estimationBy={formik.values.estimationBy}
        estimationFor={formik.values.estimationFor}
        name={formik.values.name}
        onSelect={formik.handleChange}
        handleCollapseAll={() => setCollapseAll(!collapseAll)}
        editable={editable}
        isOwner={isOwner}
        url={`http://snowman-dev.technovert.tech/calculator/estimate?key=${formik.values.formId}`}
      />
      <ProviderCard
        collapsed={collapseAll}
        selectedProvider={formik.values.provider}
        selectedRegion={formik.values.region}
        selectedSize={formik.values.size}
        selectedEdition={formik.values.edition}
        editable={editable}
        editionOptions={
          formik.values.provider && formik.values.region
            ? Object.keys(
                pricingData['Providers']?.find(
                  (x: any) => x.id === formik.values.provider
                )?.['Regions']?.[formik.values.region]?.['Compute'] || {}
              )
            : []
        }
        sizeOptions={
          formik.values.provider && formik.values.region
            ? Object.keys(pricingData['ComputeSizes'] || {})
            : []
        }
        regionOptions={
          formik.values.provider
            ? Object.keys(
                pricingData['Providers'].find(
                  (x: any) => x.id === formik.values.provider
                )?.['Regions'] || {}
              )
            : []
        }
        onSelect={formik.handleChange}
        handleProviderChange={(val: string) => {
          formik.setFieldValue('provider', val)
        }}
      />
      {formik.values.sections.map((section: SectionInterface, index: number) =>
        formik.values.sections[index].service === 'Storage' ? (
          <StorageCard
            collapsed={collapseAll}
            name={`sections.${index}`}
            icon={serviceIcons['Storage']}
            key={index}
            selectedPaymentMode={
              formik.values.sections[index].paymentMode || ''
            }
            selectedStorageSize={formik.values.sections[index].storageSize || 0}
            editable={editable}
            onSelect={formik.handleChange}
            calculatedStorageCost={
              formik.values.sections[index].sectionCost || 0
            }
            onDelete={() => handleDelete(index)}
          />
        ) : formik.values.sections[index].service === 'Transfer' ? (
          <TransferCard
            collapsed={collapseAll}
            name={`sections.${index}`}
            icon={serviceIcons['Transfer']}
            key={index}
            editable={editable}
            options={
              pricingData['Providers'].find(
                (x: any) => x.id === formik.values.provider
              )?.['Regions']?.[formik.values.region]?.['Transfer'] || {}
            }
            selectedDestinationCloudProvider={
              formik.values.sections[index].destinationCloudProvider || ''
            }
            selectedTransferRegion={
              formik.values.sections[index].transferRegion || ''
            }
            selectedDataSize={formik.values.sections[index].dataSize || 0}
            onSelect={formik.handleChange}
            calculatedTransferCost={
              formik.values.sections[index].sectionCost || 0
            }
            onDelete={() => handleDelete(index)}
          />
        ) : formik.values.sections[index].service === 'Compute' ? (
          <ComputeCard
            collapsed={collapseAll}
            name={`sections.${index}`}
            key={index}
            sizeOptions={
              formik.values.provider && formik.values.region
                ? Object.keys(pricingData['ComputeSizes'] || {})
                : []
            }
            computeSize={formik.values.sections[index].computeSize || ''}
            icon={serviceIcons['Compute']}
            selectedComputeTime={formik.values.sections[index].computeTime || 0}
            calculatedCredits={
              (formik.values.sections[index].computeTime || 0) *
              (pricingData['ComputeSizes']?.[
                formik.values.sections[index].computeSize || ''
              ] || 0)
            }
            editable={editable}
            calculatedServiceCost={parseFloat(
              (4.4 * (formik.values.sections[index].computeTime || 0)).toFixed(
                2
              )
            )}
            calculatedComputeCost={parseFloat(
              (formik.values.sections[index].sectionCost || 0).toFixed(2)
            )}
            onSelect={formik.handleChange}
            onDelete={() => handleDelete(index)}
          />
        ) : formik.values.sections[index].service === 'Serverless Features' ? (
          <ServerlessFeaturesCard
            collapsed={collapseAll}
            name={`sections.${index}`}
            key={index}
            icon={serviceIcons['Serverless Features']}
            editable={editable}
            computeCostPerCredit={
              pricingData['Providers'].find(
                (x: any) => x.id === formik.values.provider
              )?.['Regions']?.[formik.values.region]?.['Compute']?.[
                formik.values.edition || ''
              ] || 0
            }
            options={pricingData['ServerlessFeatures'].map(
              (features: any) => features.feature
            )}
            selectedServerlessFeature={
              formik.values.sections[index].serverlessFeature || ''
            }
            onSelect={formik.handleChange}
            selectedComputeTime={
              formik.values.sections[index].serverlessComputeTime || 0
            }
            creditsPerCloudServicesHour={
              pricingData['ServerlessFeatures'].find(
                (x: any) =>
                  x.feature === formik.values.sections[index].serverlessFeature
              )?.['credits']?.['cloudServices'] || 0
            }
            creditsPerSnowflakeManagedComputeHour={
              pricingData['ServerlessFeatures']?.find(
                (x: any) =>
                  x.feature === formik.values.sections[index].serverlessFeature
              )?.['credits']?.['snowflakeManagedCompute'] || 0
            }
            calculatedServerlessCost={
              formik.values.sections[index].sectionCost || 0
            }
            onDelete={() => handleDelete(index)}
          />
        ) : formik.values.sections[index].service === 'Snowpipe' ? (
          <SnowpipeCard
            collapsed={collapseAll}
            name={`sections.${index}`}
            key={index}
            icon={serviceIcons['Snowpipe']}
            onSelect={formik.handleChange}
            editable={editable}
            selectedComputeTime={
              formik.values.sections[index].snowpipeComputeTime || 0
            }
            selectedNoOfFilesLoaded={
              formik.values.sections[index].snowpipeNoOfFiles || 0
            }
            computeCostPerCredit={
              pricingData['Providers'].find(
                (x: any) => x.id === formik.values.provider
              )?.['Regions']?.[formik.values.region]?.['Compute']?.[
                formik.values.edition || ''
              ] || 0
            }
            calculatedFileLoadingCredits={parseFloat(
              (
                0.00006 * (formik.values.sections[index].snowpipeNoOfFiles || 0)
              ).toFixed(2)
            )}
            creditsPerComputeHour={1.25}
            calculatedSnowpipeCost={
              formik.values.sections[index].sectionCost || 0
            }
            onDelete={() => handleDelete(index)}
          />
        ) : null
      )}
      <div className="mt-4">
        {formik.values.provider &&
          formik.values.region &&
          formik.values.edition &&
          editable && (
            <SectionSelector
              options={
                formik.values.provider && formik.values.region
                  ? formik.values.edition == 'VPS'
                    ? Object.fromEntries(
                        Object.entries(serviceIcons).filter(
                          ([key, val]) => key != 'Transfer'
                        )
                      )
                    : serviceIcons
                  : {}
              }
              onSelect={(option) => {
                addSection(option)
              }}
            />
          )}
      </div>
      <div className="mb-4">
        <SummaryCard
          name={formik.values.name}
          provider={formik.values.provider}
          region={formik.values.region}
          edition={formik.values.edition}
          size={formik.values.size}
          sections={formik.values.sections}
          totalCost={formik.values.totalCost}
        />
      </div>
    </form>
  )
}

export default Form
