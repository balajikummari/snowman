import Dropdown from 'components/Dropdown'
import React, { useEffect } from 'react'
import Image from 'next/image'
import ProviderSelector from 'components/ProviderSelector'

interface ProviderCardProps {
  onSelect: (value: string) => void
  selectedProvider: string
  editable: boolean
  collapsed: boolean
  selectedRegion: string
  selectedSize: string
  selectedEdition: string
  handleProviderChange: (value: string) => void
  editionOptions: Array<string>
  regionOptions: Array<string>
  sizeOptions: Array<string>
}

const ProviderCard = ({
  selectedProvider,
  collapsed,
  editable,
  selectedRegion,
  selectedSize,
  selectedEdition,
  editionOptions,
  regionOptions,
  sizeOptions,
  onSelect,
  handleProviderChange,
}: ProviderCardProps) => {
  const logos = {
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
  const [closed, setClosed] = React.useState(collapsed)
  useEffect(() => {
    setClosed(collapsed)
  }, [collapsed])
  return (
    <>
      <div
        tabIndex={0}
        className={`collapse-card ${
          closed ? 'collapse-card-close' : 'collapse-card-open'
        } mt-4 w-auto overflow-visible rounded border border-secondary bg-base-100`}
      >
        <div
          className={`collapse-card-title flex w-auto flex-row flex-wrap items-center justify-between text-md font-bold ${
            closed ? 'bg-secondary bg-opacity-10' : 'hidden'
          }`}
        >
          <div className="flex flex-row items-center gap-2 pl-8 text-primary">
            {selectedProvider === 'Azure' ? (
              <div>{logos.Azure}</div>
            ) : selectedProvider === 'AWS' ? (
              <div>{logos.AWS}</div>
            ) : selectedProvider === 'GCP' ? (
              <div>{logos.GCP}</div>
            ) : (
              ''
            )}
            <div className="font-bold">{selectedProvider}</div>
          </div>
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div>{selectedRegion ? 'Region:' : ''}</div>
            <div className="font-semibold text-primary">{selectedRegion}</div>
          </div>
          <div
            className={`items-center text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div>{selectedSize ? 'Size:' : ''}</div>
            <div className="font-semibold text-primary">{selectedSize}</div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div
              className={`items-center  text-base font-normal ${
                closed ? 'flex flex-row justify-between gap-2' : 'hidden'
              }`}
            >
              <div>{selectedEdition ? 'Edition:' : ''}</div>
              <div className="font-semibold text-primary">
                {selectedEdition}
              </div>
            </div>
          </div>
          <div
            className={`btn btn-ghost btn-circle ${
              closed ? 'rotate-0' : 'rotate-180'
            }`}
            onClick={() => setClosed(!closed)}
          >
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <div
          className={`${
            closed ? 'hidden' : ''
          } collapse-card-content flex w-full flex-row flex-wrap justify-between bg-base-100 p-10 `}
        >
          <div className="flex flex-col justify-between pl-36 pb-8 ">
            <div className="mt-2 text-base">Default Cloud Provider:</div>

            <ProviderSelector
              options={logos}
              onSelect={handleProviderChange}
              selected={selectedProvider}
              editable={editable}
            />
          </div>
          <div className="m-2 flex flex-col pb-8">
            <div className="mt-6 text-base">Default Region:</div>
            <div className="mt-2">
              <Dropdown
                options={regionOptions}
                size="large"
                name="region"
                selected={selectedRegion}
                onSelect={onSelect}
                editable={editable}
              />
            </div>
            {/* <div className="mt-2 text-base">Size:</div>
            <div className="mt-4">
              <Dropdown
                name={`size`}
                selected={selectedSize}
                onSelect={onSelect}
                options={sizeOptions}
                size="large"
                editable={editable}
              />
            </div> */}
            <div className="mt-8 text-base">Edition:</div>
            <div className="mt-4">
              <Dropdown
                name={`edition`}
                selected={selectedEdition}
                options={editionOptions}
                onSelect={onSelect}
                size="large"
                editable={editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <button
              className={`btn btn-ghost btn-circle ${
                closed ? 'rotate-0' : 'rotate-180'
              }`}
              onClick={() => setClosed(!closed)}
            >
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProviderCard
