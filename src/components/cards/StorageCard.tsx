import { DeleteButton } from 'components/DeleteButton'
import Dropdown from 'components/Dropdown'
import OutputBox from 'components/OutputBox'
import TextInput from 'components/TextInput'
import React, { useEffect } from 'react'

interface StorageCardProps {
  collapsed: boolean
  name: string
  calculatedStorageCost: number
  icon: React.ReactNode
  selectedPaymentMode: string
  selectedStorageSize: number
  editable: boolean

  onSelect: (value: any) => void
  onDelete: () => void
}

export function StorageCard({
  name,
  icon,
  collapsed,
  editable,
  calculatedStorageCost,
  selectedPaymentMode,
  selectedStorageSize,
  onSelect,
  onDelete,
}: StorageCardProps) {
  const [closed, setClosed] = React.useState(collapsed)
  // on state change rerender
  useEffect(() => {
    setClosed(collapsed)
  }, [collapsed])

  return (
    <>
      <div
        tabIndex={0}
        className={`collapse-card ${
          closed ? 'collapse-card-close overflow-hidden' : 'collapse-card-open'
        } mt-4 w-auto  rounded border border-secondary bg-base-100`}
      >
        <div
          className={`collapse-card-title flex  flex-row flex-wrap items-center justify-between text-md font-semibold ${
            closed ? '' : 'border-b border-secondary bg-base-200'
          }`}
        >
          <div className="flex flex-row items-center justify-center gap-2 text-primary">
            <div>{icon}</div>
            <div>STORAGE</div>
          </div>
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div>Average Size:</div>
            <div className="font-semibold text-primary">
              {selectedStorageSize}
            </div>
            <div className="text-base-content opacity-70">TB</div>
          </div>
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div>Payment Mode:</div>
            <div className="font-semibold text-primary">
              {selectedPaymentMode}
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
                {calculatedStorageCost}
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
          <div className="flex flex-col justify-center ">
            <div className="mt-2 flex flex-row items-center justify-between  text-base">
              <div>Average Size In TB:</div>
              <div
                className="tooltip"
                data-tip="The average 
                terabytes per month is calculated by taking periodic snapshots of all Customer Data. The daily average will be displayed in the Snowflake Service."
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
                selected={selectedStorageSize}
                placeholder="0"
                unit={'TB'}
                onChange={onSelect}
                name={`${name}.storageSize`}
                editable={editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Payment Model:</div>
              <div
                className="tooltip"
                data-tip="The Snowflake Service may be subscribed to on an On Demand basis, where usage is invoiced in arrears every month, or on a Capacity 
                basis, where a set dollar amount of usage is purchased up front. Pricing depends on whether you are in On Demand or Capacity"
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
                name={`${name}.paymentMode`}
                selected={selectedPaymentMode}
                onSelect={onSelect}
                options={['On Demand', 'UpFront']}
                size="small"
                editable={editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mt-2 flex flex-row items-center justify-between overflow-visible text-base">
              <div>Total Cost:</div>
              <div
                className="tooltip"
                data-tip="Cost is calculated by multiplying the average size in TB by the monthly price. The price is based on the selected payment mode."
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
                $ {calculatedStorageCost}
              </OutputBox>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
