import ButtonSecondary from 'components/ButtonSecondary'
import { SectionInterface } from 'components/SectionInterface'
import { saveAs } from 'file-saver'
import React from 'react'

const download = (data: string, filename: string, type: string) => {
  const file = new Blob([data], { type: type })
  saveAs(file, filename)
}
const generateXlsx = (
  name: string,
  provider: string,
  region: string,
  size: string,
  edition: string,
  sections: SectionInterface[],
  totalCost: number
) => {
  interface Section {
    service: string
    description: string
    price: number
  }

  let xlsx = require('json-as-xlsx')
  const sectionsData = [] as Section[]
  sections.forEach((element: { [x: string]: any }) => {
    const section = {
      service: element['service'],
      description:
        element['service'] == 'Storage'
          ? `${element['storageSize']} TB of Storage, ${element['paymentMode']} Payment`
          : element['service'] == 'Serverless Features'
          ? `${element['serverlessComputeTime']} Hours of ${element['serverlessFeature']} on ${size}(size) ${edition} Virtual Instance`
          : element['service'] == 'Transfer'
          ? `${element['dataSize']} TB of Transfer to ${element['destinationCloudProvider']} in  ${element['transferRegion']}`
          : element['service'] == 'Snowpipe'
          ? `${element['snowpipeComputeTime']} Hours of Snowpipe for ${element['snowpipeNoOfFiles']} files on ${size}(size) ${edition} Virtual Instance`
          : element['service'] == 'Compute'
          ? `${element['computeTime']} Hours of Compute on ${size}(size) ${edition} Virtual Instance`
          : 'Unknown Service',
      price: element['sectionCost'],
    }
    sectionsData.push(section)
  })
  sectionsData.push({
    service: 'Total',
    description: '',
    price: totalCost,
  })
  const metaData = []
  metaData.push({
    name: name,
    provider: provider,
    region: region,
    size: size,
    edition: edition,
  })

  let data = [
    {
      sheet: 'Estimate',
      columns: [
        { label: 'Service', value: 'service' }, // Top level data
        { label: 'Description', value: 'description' }, // Custom format
        { label: 'Cost', value: 'price', format: '$ #' },
      ],
      content: sectionsData,
    },
    {
      sheet: 'Configuration',
      columns: [
        { label: 'Name of the Estimate', value: 'name' }, // Top level data
        { label: 'Cloud Provider', value: 'provider' }, // Column format
        { label: 'Region', value: 'region' },
        { label: 'Size', value: 'size' },
        { label: 'Edition', value: 'edition' },
      ],
      content: metaData,
    },
  ]

  let settings = {
    fileName: name ? name + ' Technovert' : 'Untitled Estimate Technovert', // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
  }

  xlsx(data, settings) // Will download the excel file
}

interface SummaryCardProps {
  name: string
  provider: string
  region: string
  edition: string
  size: string
  sections: SectionInterface[]
  totalCost: number
}

const SummaryCard = ({
  name,
  provider,
  region,
  size,
  edition,
  sections,
  totalCost,
}: SummaryCardProps) => {
  return (
    <div className="mt-4 flex w-auto flex-col rounded border border-secondary bg-base-100 p-8 text-md">
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="col-span-3 text-xl font-medium">Summary:</div>
        <ButtonSecondary
          label="Export"
          icon={
            <svg
              width="31"
              height="33"
              viewBox="0 0 31 33"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M28.1471 0H7.44118C6.84054 0 6.2645 0.238602 5.83979 0.663317C5.41507 1.08803 5.17647 1.66407 5.17647 2.26471V6.47059H2.26471C1.66407 6.47059 1.08803 6.70919 0.663317 7.1339C0.238602 7.55862 0 8.13466 0 8.73529V24.2647C0 24.8653 0.238602 25.4414 0.663317 25.8661C1.08803 26.2908 1.66407 26.5294 2.26471 26.5294H5.17647V30.7353C5.17647 31.3359 5.41507 31.912 5.83979 32.3367C6.2645 32.7614 6.84054 33 7.44118 33H28.1471C28.7477 33 29.3237 32.7614 29.7485 32.3367C30.1732 31.912 30.4118 31.3359 30.4118 30.7353V2.26471C30.4118 1.66407 30.1732 1.08803 29.7485 0.663317C29.3237 0.238602 28.7477 0 28.1471 0ZM21.3529 12.2941H28.4706V20.7059H21.3529V12.2941ZM28.4706 2.26471V10.3529H21.3529V8.73529C21.3529 8.13466 21.1143 7.55862 20.6896 7.1339C20.2649 6.70919 19.6889 6.47059 19.0882 6.47059H18.7647V1.94118H28.1471C28.2329 1.94118 28.3152 1.97526 28.3758 2.03594C28.4365 2.09661 28.4706 2.1789 28.4706 2.26471ZM7.11765 2.26471C7.11765 2.1789 7.15173 2.09661 7.21241 2.03594C7.27308 1.97526 7.35537 1.94118 7.44118 1.94118H16.8235V6.47059H7.11765V2.26471ZM1.94118 24.2647V8.73529C1.94118 8.64949 1.97526 8.5672 2.03594 8.50652C2.09661 8.44585 2.1789 8.41177 2.26471 8.41177H19.0882C19.174 8.41177 19.2563 8.44585 19.317 8.50652C19.3777 8.5672 19.4118 8.64949 19.4118 8.73529V24.2647C19.4118 24.3505 19.3777 24.4328 19.317 24.4935C19.2563 24.5541 19.174 24.5882 19.0882 24.5882H2.26471C2.1789 24.5882 2.09661 24.5541 2.03594 24.4935C1.97526 24.4328 1.94118 24.3505 1.94118 24.2647ZM7.11765 30.7353V26.5294H16.8235V31.0588H7.44118C7.35537 31.0588 7.27308 31.0247 7.21241 30.9641C7.15173 30.9034 7.11765 30.8211 7.11765 30.7353ZM28.1471 31.0588H18.7647V26.5294H19.0882C19.6889 26.5294 20.2649 26.2908 20.6896 25.8661C21.1143 25.4414 21.3529 24.8653 21.3529 24.2647V22.6471H28.4706V30.7353C28.4706 30.8211 28.4365 30.9034 28.3758 30.9641C28.3152 31.0247 28.2329 31.0588 28.1471 31.0588ZM6.98824 19.8L9.46324 16.5L6.98824 13.2C6.91176 13.098 6.85612 12.982 6.82449 12.8585C6.79285 12.7351 6.78585 12.6066 6.80387 12.4804C6.8219 12.3542 6.8646 12.2328 6.92954 12.1231C6.99448 12.0135 7.08039 11.9177 7.18235 11.8412C7.28432 11.7647 7.40035 11.7091 7.52383 11.6774C7.6473 11.6458 7.77579 11.6388 7.90197 11.6568C8.02815 11.6748 8.14954 11.7175 8.25922 11.7825C8.36889 11.8474 8.4647 11.9333 8.54118 12.0353L10.6765 14.8824L12.8118 12.0353C12.9662 11.8294 13.1961 11.6932 13.451 11.6568C13.7058 11.6204 13.9647 11.6867 14.1706 11.8412C14.3765 11.9956 14.5127 12.2256 14.5491 12.4804C14.5855 12.7352 14.5192 12.9941 14.3647 13.2L11.8897 16.5L14.3647 19.8C14.5192 20.0059 14.5855 20.2648 14.5491 20.5196C14.5127 20.7744 14.3765 21.0044 14.1706 21.1588C13.9647 21.3133 13.7058 21.3796 13.451 21.3432C13.1961 21.3068 12.9662 21.1706 12.8118 20.9647L10.6765 18.1176L8.54118 20.9647C8.4647 21.0667 8.36889 21.1526 8.25922 21.2175C8.14954 21.2825 8.02815 21.3252 7.90197 21.3432C7.77579 21.3612 7.6473 21.3542 7.52383 21.3226C7.40035 21.2909 7.28432 21.2353 7.18235 21.1588C7.08039 21.0823 6.99448 20.9865 6.92954 20.8769C6.8646 20.7672 6.8219 20.6458 6.80387 20.5196C6.78585 20.3934 6.79285 20.2649 6.82449 20.1415C6.85612 20.018 6.91176 19.902 6.98824 19.8Z" />
            </svg>
          }
          onClick={() => {
            generateXlsx(
              name,
              provider,
              region,
              size,
              edition,
              sections,
              totalCost
            )

            // download(
            //   data,
            //   name ? `${name}.xls` : 'UntitledEstimate.xls',
            //   'application/vnd.ms-excel'
            // )
          }}
        />
        {/* <ButtonSecondary
          label="Compare"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="31"
              height="31"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9 5.5a3.5 3.5 0 0 1-3 3.465V15a3 3 0 0 0 3 3h2.69l-.97-.97a.75.75 0 1 1 1.06-1.06l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H9A4.5 4.5 0 0 1 4.5 15V8.855A3.502 3.502 0 0 1 5.5 2A3.5 3.5 0 0 1 9 5.5Zm-1.5 0a2 2 0 1 0-4 0a2 2 0 0 0 4 0Zm14.5 13a3.5 3.5 0 1 1-4-3.465V9a3 3 0 0 0-3-3h-1.94l.97.97a.75.75 0 0 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 1 1 1.06 1.06l-.97.97H15A4.5 4.5 0 0 1 19.5 9v6.145c1.446.43 2.5 1.77 2.5 3.355Zm-1.5 0a2 2 0 1 0-4 0a2 2 0 0 0 4 0Z"
              />
            </svg>
          }
        /> */}
      </div>
      <div className="mt-8 flex flex-row flex-wrap items-center justify-between bg-secondary bg-opacity-10 p-4">
        <div className="flex flex-row justify-center gap-4 p-2">
          <div className="font-semibold">Cloud Provider:</div>
          <div className="font-normal">{provider}</div>
        </div>
        <div className="flex flex-row justify-center gap-4 p-2">
          <div className="font-semibold">Edition:</div>
          <div className="font-normal">{edition}</div>
        </div>
        <div className="flex flex-row justify-center gap-4 p-2">
          <div className="font-semibold">Region:</div>
          <div className="font-normal">{region}</div>
        </div>
      </div>
      {sections
        ? sections.map((section, index) => (
            <div
              key={index}
              className="mt-4 flex flex-row items-center justify-between p-4"
            >
              <div className="flex flex-row gap-4">
                <div className="font-medium">
                  {' '}
                  {section.service == 'Serverless Features'
                    ? 'Serverless'
                    : section.service}
                </div>

                {section.service == 'Storage' ? (
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-row">
                      <div>{section.storageSize}</div>
                      <div className="opacity-70">
                        {section.storageSize && 'TB'}
                      </div>
                    </div>
                    <div className="text-primary">{section.paymentMode}</div>
                  </div>
                ) : section.service == 'Compute' ? (
                  <div className="flex w-full flex-row items-center justify-around gap-4">
                    <div className="flex flex-row items-center gap-2 ">
                      <div className="text-sm opacity-70">
                        {section.computeSize && 'Size'}
                      </div>
                      <div className="text-primary">{section.computeSize}</div>
                    </div>
                    <div className="flex flex-row">
                      <div>{section.computeTime}</div>
                      <div className="opacity-70">
                        {section.computeTime && 'Hrs'}
                      </div>
                    </div>
                  </div>
                ) : section.service == 'Transfer' ? (
                  <div className="flex w-full flex-row items-center justify-around gap-4">
                    <div className="flex flex-row">
                      <div>{section.dataSize}</div>
                      <div className="opacity-70">
                        {section.dataSize && 'TB'}
                      </div>
                    </div>
                    <div className="text-primary">
                      {section.destinationCloudProvider}
                    </div>
                    <div className="text-primary">{section.transferRegion}</div>
                  </div>
                ) : section.service == 'Serverless Features' ? (
                  <div className="flex w-full flex-row items-center justify-around gap-4">
                    <div className="flex flex-row">
                      <div>{section.serverlessComputeTime}</div>
                      <div className="opacity-70">
                        {section.serverlessComputeTime && 'Hrs'}
                      </div>
                    </div>
                    <div className="text-primary">
                      {section.serverlessFeature}
                    </div>
                  </div>
                ) : section.service == 'Snowpipe' ? (
                  <div className="flex w-full flex-row items-center justify-around gap-4">
                    <div className="flex flex-row">
                      <div>{section.snowpipeComputeTime}</div>
                      <div className="opacity-70">
                        {section.snowpipeComputeTime && 'Hrs'}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div>{section.snowpipeNoOfFiles}</div>
                      <div className="opacity-70">
                        {section.snowpipeNoOfFiles && 'Files'}
                      </div>
                    </div>
                    <div className="text-primary">{section.transferRegion}</div>
                  </div>
                ) : null}
              </div>
              <div className="text-lg font-medium">
                {'$ '}
                {section.sectionCost}
              </div>
            </div>
          ))
        : null}

      <div className="mt-8 flex flex-row items-center justify-between bg-secondary bg-opacity-10 p-4">
        <div className="text-lg font-medium">Total :</div>
        <div className="text-xl font-medium">
          {'$ '}
          {totalCost}
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
