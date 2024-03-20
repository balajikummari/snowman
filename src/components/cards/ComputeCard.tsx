import { DeleteButton } from './../DeleteButton'
import Dropdown from 'components/Dropdown'
import OutputBox from 'components/OutputBox'
import TextInput from 'components/TextInput'

import React, { useEffect } from 'react'
interface ComputeCardProps {
  name: string
  icon: React.ReactNode
  collapsed: boolean
  calculatedCredits: number
  calculatedServiceCost: number
  calculatedComputeCost: number
  selectedComputeTime: number
  computeSize: string
  sizeOptions: Array<string>
  editable: boolean
  onSelect: (value: any) => void
  onDelete: () => void
}

const ComputeCard = ({
  name,
  collapsed,
  selectedComputeTime,
  icon,
  calculatedCredits,
  computeSize,
  sizeOptions,
  calculatedServiceCost,
  calculatedComputeCost,
  editable,
  onSelect,
  onDelete,
}: ComputeCardProps) => {
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
          <div className="flex flex-row items-center gap-2 text-primary">
            <div>{icon}</div>
            <div>COMPUTE</div>
          </div>
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div>Compute Time:</div>
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
            <div>Size:</div>
            <div className="font-semibold text-primary">{computeSize}</div>
          </div>
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div>Credits:</div>
            <div className="font-semibold text-primary">
              {calculatedCredits}
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
                {calculatedComputeCost}
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
          <div className="flex flex-col justify-start">
            <div className="mt-2 flex flex-row items-center justify-between overflow-visible text-base">
              <div>Compute Time:</div>
              <div
                className="tooltip"
                data-tip="Compute Time is the amount of time you will be using this service for.  This is the time you will be using the service for, not the time it will take to complete the service."
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
                onChange={onSelect}
                name={`${name}.computeTime`}
                editable={editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="mt-2 flex flex-row items-center justify-between overflow-visible text-base">
              <div>Credits:</div>
              <div
                className="tooltip"
                data-tip="Usage of Virtual Warehouse Services is charged on the basis of credits (“Snowflake Credits”) 
               consumed for the operation of a Virtual Warehouse "
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
              <OutputBox name={`${name}.credits`}>
                {calculatedCredits}
              </OutputBox>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="mt-2 text-base">Size:</div>
            <div className="mt-4">
              <Dropdown
                name={`${name}.computeSize`}
                selected={computeSize}
                onSelect={onSelect}
                options={sizeOptions}
                size="large"
                editable={editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            {/* <div className="mt-2 flex flex-row items-center justify-between overflow-visible text-base">
              <div>Cloud Service Cost:</div>
              <div
                className="tooltip"
                data-tip="Cloud 
                Services is charged based on the number of Cloud Services Compute-Hours used while operating the Snowflake 
                Service. You will be charged 4.4 Credits per Compute-Hour. Your daily use of Cloud Services will not incur any charges if the daily 
                Snowflake Credits charged for such use is less than or equal to 10% of the daily Snowflake Credits consumed for use of Virtual 
                Warehouse Services"
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
              <OutputBox name={`${name}.cloudServiceCost`}>
                $ {calculatedServiceCost}
              </OutputBox>
            </div> */}
            <div className="mt-2 flex flex-row items-center justify-between overflow-visible text-base">
              <div>Total Cost:</div>
              <div
                className="tooltip"
                data-tip="Compute Cost + Discounted Cloud Service Cost as per Snowflake Cloud Service Adjustment"
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
                $ {calculatedComputeCost}
              </OutputBox>
            </div>
            {/* <div className=" w-60  p-2 text-primary">
              <div className="flex flex-row justify-around">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                10% of daily credits free
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ComputeCard
