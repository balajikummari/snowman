import { DeleteButton } from 'components/DeleteButton'
import Dropdown from 'components/Dropdown'
import OutputBox from 'components/OutputBox'
import TextInput from 'components/TextInput'
import React, { useEffect } from 'react'
interface ServerlessFeaturesCardProps {
  name: string
  selectedServerlessFeature: string
  icon: React.ReactNode
  collapsed: boolean
  options: any
  editable: boolean
  computeCostPerCredit?: number
  creditsPerSnowflakeManagedComputeHour: number
  creditsPerCloudServicesHour: number
  selectedComputeTime: number
  calculatedServerlessCost: number
  onSelect: (value: any) => void
  onDelete: () => void
}

const ServerlessFeaturesCard = ({
  name,
  options,
  collapsed,
  editable,
  icon,
  selectedServerlessFeature,
  creditsPerSnowflakeManagedComputeHour,
  creditsPerCloudServicesHour,
  computeCostPerCredit,
  selectedComputeTime,
  calculatedServerlessCost,
  onSelect,
  onDelete,
}: ServerlessFeaturesCardProps) => {
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
          className={`collapse-card-title flex flex-row flex-wrap items-center justify-between text-md font-semibold ${
            closed ? '' : 'border-b border-secondary bg-base-200'
          }`}
        >
          <div className="flex flex-row items-center justify-center gap-1 text-primary">
            <div>{icon}</div>
            <div>SERVERLESS FEATURES</div>
          </div>
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div className="font-semibold text-primary">
              {selectedServerlessFeature}
            </div>
          </div>
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div>Time:</div>
            <div className="font-semibold text-primary">
              {selectedComputeTime}
            </div>
            <div className="text-base-content opacity-70">Hrs</div>
          </div>
          <div className="flex flex-row items-center gap-2 self-end">
            <div
              className={`text-left text-base font-normal ${
                closed ? 'flex flex-row justify-between gap-2' : 'hidden'
              }`}
            >
              <div>Total Cost:</div>
              <div className="font-semibold text-primary">
                {'$ '}
                {calculatedServerlessCost}
              </div>
            </div>
            <DeleteButton onDelete={onDelete} editable={editable} />
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
        </div>
        <div
          className={`${
            closed ? 'hidden' : ''
          }    collapse-card-content flex  w-full  flex-row flex-wrap justify-around  bg-base-100`}
        >
          <div className="flex flex-col justify-center">
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Feature:</div>
              <div
                className="tooltip"
                data-tip="Choose a serverless function to add to your serverless application"
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
            <div className="mt-4">
              <Dropdown
                name={`${name}.serverlessFeature`}
                key={`${name}.serverlessFeature`}
                selected={selectedServerlessFeature}
                onSelect={onSelect}
                options={options}
                size="large"
                editable={editable}
              />
            </div>

            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Credits per Compute Hour:</div>
              <div
                className="tooltip"
                data-tip="The number of credits that will be charged for each compute hour of the selected serverless function"
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
            <div className="mt-4">
              <OutputBox name={`${name}.creditsPerSnowflakeManagedComputeHour`}>
                {creditsPerSnowflakeManagedComputeHour}
                {/* creditsPerCloudServicesHour,} */}
              </OutputBox>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Compute Time:</div>
              <div
                className="tooltip"
                data-tip="The number of hours that will be charged for the selected serverless function to run"
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
            <div className="mt-4">
              <TextInput
                selected={selectedComputeTime}
                placeholder="0"
                unit={'Hrs'}
                name={`${name}.serverlessComputeTime`}
                onChange={onSelect}
                editable={editable}
              />
            </div>
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Cost Per Credit:</div>
              <div
                className="tooltip"
                data-tip="The cost per credit that will be charged for the selected serverless function"
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
            <div className="mt-4">
              <OutputBox
                staticValue={true}
                name={`${name}.computeCostPerCredit`}
              >
                $ {computeCostPerCredit}
              </OutputBox>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Cloud Services Credits:</div>
              <div
                className="tooltip"
                data-tip="The number of credits that will be charged for each compute hour of the selected serverless function"
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
            <div className="mt-4">
              <OutputBox name={`${name}.creditsPerCloudServicesHour`}>
                {creditsPerCloudServicesHour}
                {/* creditsPerCloudServicesHour,} */}
              </OutputBox>
            </div>
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Total Cost:</div>
              <div
                className="tooltip"
                data-tip="The total cost of the selected serverless function and compute time in credits for the selected serverless function"
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
            <div className="mt-4">
              <OutputBox name={`${name}.sectionCost`}>
                $ {calculatedServerlessCost}
              </OutputBox>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServerlessFeaturesCard
