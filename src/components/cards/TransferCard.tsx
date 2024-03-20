import { DeleteButton } from 'components/DeleteButton'
import Dropdown from 'components/Dropdown'
import OutputBox from 'components/OutputBox'
import TextInput from 'components/TextInput'
import React, { useEffect } from 'react'
interface TransferCardProps {
  name: string
  collapsed: boolean
  selectedDestinationCloudProvider: string
  options: any
  editable: boolean

  selectedTransferRegion: string
  calculatedTransferCost: number
  icon: React.ReactNode
  selectedDataSize: number
  onSelect: (value: any) => void
  onDelete: () => void
}

const TransferCard = ({
  name,
  collapsed,
  options,
  icon,
  editable,
  selectedTransferRegion,
  selectedDestinationCloudProvider,
  calculatedTransferCost,
  selectedDataSize,
  onSelect,
  onDelete,
}: TransferCardProps) => {
  let arr: string[] = []
  arr.push(Object.keys(options?.['Same Cloud Provider'] || {})[0])
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
            <div>TRANSFER</div>
          </div>
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div className="font-semibold text-primary">{selectedDataSize}</div>
            <div className="text-base-content opacity-70">TB</div>
          </div>
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div className="font-semibold text-primary">
              {selectedTransferRegion}
            </div>
          </div>
          <div
            className={`text-left text-base font-normal ${
              closed ? 'flex flex-row justify-between gap-2' : 'hidden'
            }`}
          >
            <div className="font-semibold text-primary">
              {selectedDestinationCloudProvider}
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
                {calculatedTransferCost}
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
              <div>Destination Cloud Provider:</div>
              <div
                className="tooltip"
                data-tip="Select the cloud provider you want to transfer to"
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
                name={`${name}.destinationCloudProvider`}
                key={`${name}.destinationCloudProvider`}
                selected={selectedDestinationCloudProvider}
                onSelect={onSelect}
                options={Object.keys(options)}
                size="large"
                editable={editable}
              />
            </div>

            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Average Size In TB:</div>
              <div
                className="tooltip"
                data-tip="Average size of data in TB that you want to transfer to the selected cloud provider in the selected region"
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
                placeholder="0"
                selected={selectedDataSize}
                unit={'TB'}
                name={`${name}.dataSize`}
                onChange={onSelect}
                editable={editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Transfer Region:</div>
              <div
                className="tooltip"
                data-tip="Select the region you want to transfer to "
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
                name={`${name}.transferRegion`}
                key={`${name}.transferRegion`}
                selected={selectedTransferRegion}
                onSelect={onSelect}
                options={
                  selectedDestinationCloudProvider === 'Same Cloud Provider'
                    ? arr.concat(
                        Object.keys(
                          options?.['Same Cloud Provider']?.[
                            'Different Region'
                          ] || {}
                        )
                      )
                    : arr.concat(
                        Object.keys(
                          options?.['Different Cloud Provider']?.[
                            'Different Region'
                          ] || {}
                        )
                      )
                }
                size="large"
                editable={editable}
              />
            </div>
            <div className="mt-2 flex flex-row items-center justify-between text-base">
              <div>Total Cost:</div>
              <div
                className="tooltip"
                data-tip="Cost of transferring data to the selected cloud provider in the selected region"
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
                ${calculatedTransferCost}
              </OutputBox>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TransferCard
