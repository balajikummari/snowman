import { DeleteButton } from 'components/DeleteButton'
import Dropdown from 'components/Dropdown'
import OutputBox from 'components/OutputBox'
import TextInput from 'components/TextInput'
import React, { useEffect } from 'react'
interface SnowpipeCardProps {
  name: string
  icon: React.ReactNode
  collapsed: boolean
  editable: boolean
  selectedNoOfFilesLoaded: number
  creditsPerComputeHour: number
  calculatedFileLoadingCredits: number
  calculatedSnowpipeCost: number
  computeCostPerCredit: number
  selectedComputeTime: number
  onSelect: (value: any) => void
  onDelete: () => void
}

const SnowpipeCard = ({
  name,
  collapsed,
  selectedNoOfFilesLoaded,
  icon,
  editable,
  creditsPerComputeHour,
  calculatedFileLoadingCredits,
  selectedComputeTime,
  computeCostPerCredit,
  calculatedSnowpipeCost,
  onSelect,
  onDelete,
}: SnowpipeCardProps) => {
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
          <div className="flex flex-row items-center justify-center gap-2 text-primary">
            <div>{icon}</div>
            <div>SERVERLESS FEATURES - SNOWPIPE</div>
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
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div>Files Loaded:</div>
            <div className="font-semibold text-primary">
              {selectedNoOfFilesLoaded}
            </div>
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
                {calculatedSnowpipeCost}
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
              <div>Compute Time:</div>
              <div
                className="tooltip"
                data-tip="Compute time is the number of hours you will be using the Snowpipe for the selected files."
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
                unit={'Hrs'}
                name={`${name}.snowpipeComputeTime`}
                placeholder="0"
                onChange={onSelect}
                editable={editable}
              />
            </div>
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Credits Per Compute Hour:</div>
              <div
                className="tooltip"
                data-tip="The number of credits you will be charged for each hour of compute time."
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
                name={`${name}.creditsPerComputeHour`}
              >
                {creditsPerComputeHour}
              </OutputBox>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>No. of Files Loaded :</div>
              <div
                className="tooltip"
                data-tip="The number of files you will be loading into the Snowpipe."
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
                selected={selectedNoOfFilesLoaded}
                unit={'Files'}
                placeholder="0"
                name={`${name}.snowpipeNoOfFiles`}
                onChange={onSelect}
                editable={editable}
              />
            </div>
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>File Loading Credits:</div>
              <div
                className="tooltip"
                data-tip="The number of credits you will be charged for loading the selected number of files into the Snowpipe."
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
              <OutputBox name={`${name}.fileLoadingCredits`}>
                {calculatedFileLoadingCredits}
              </OutputBox>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Cost Per Credit:</div>
              <div
                className="tooltip"
                data-tip="The cost per credit you will be charged for each credit you use."
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
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Total Cost:</div>
              <div
                className="tooltip"
                data-tip="The total cost of the Snowpipe.This is the sum of the compute time and the file loading credits."
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
                $ {calculatedSnowpipeCost}
              </OutputBox>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SnowpipeCard
