import type { NextPage } from 'next'
import Image from 'next/image'
import Dropdown from 'components/Dropdown'
import RadioGroup from 'components/RadioGroup'
import Checkbox from 'components/Checkbox'
import ToolsCard from 'components/ToolsCard'
import ButtonPrimary from 'components/ButtonPrimary'
import ButtonSecondary from 'components/ButtonSecondary'
import TextInput from 'components/TextInput'
import HistoryCard from 'components/HistoryCard'
import { useState } from 'react'
import ThemeSwitcher from 'components/ThemeSwitcher'
import Breadcrumbs from 'components/Breadcrumbs'

const Home: NextPage = () => {
  let fruits: Array<string> = ['Apple', 'Orange', 'Banana']
  const [fruit, setFruit] = useState('')
  const [fruit1, setFruit1] = useState('')

  const logos = {
    Azure: (
      <Image
        alt="Microsoft Azure Logo"
        src="/Microsoft_Azure.svg"
        height={30}
        width={30}
      />
    ),
    AWS: (
      <Image
        alt="Amazon Web Services Logo"
        src="/Amazon_Web_Services_Logo.svg"
        height={30}
        width={30}
      />
    ),
    GCP: (
      <Image
        alt="Google Cloud Platform Logo"
        src="/Google-cloud-platform.svg"
        height={30}
        width={30}
      />
    ),
  }

  return (
    <div className="container mt-4">
      URL : {process.env.URL} <br />
      ENV: {process.env.ENV} <br />
      <ThemeSwitcher />
      <Breadcrumbs />
      <PageRow>
        <div className="text-lg font-bold">Buttons</div>
        <ButtonPrimary
          label="Button"
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
        <ButtonSecondary
          label="Button"
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
        />
      </PageRow>
      <PageRow>
        <div className="text-lg font-bold">Dropdowns</div>
        <Dropdown
          editable={true}
          name="fruit"
          selected={fruit}
          onSelect={(value) => {
            setFruit(value)
          }}
          size="small"
          options={fruits}
        />
        <Dropdown
          editable={false}
          name="fruit1"
          selected={fruit1}
          onSelect={(value) => {
            setFruit1(value)
          }}
          size="large"
          options={fruits}
        />
      </PageRow>
      <PageRow>
        <div className="text-lg font-bold">Radios</div>
        <RadioGroup name="fruits" options={fruits} selected={fruits[1]} />
      </PageRow>
      <PageRow>
        <div className="text-lg font-bold">Checkbox</div>
        <Checkbox label="Checkbox" />
      </PageRow>
      <PageRow>
        <div className="text-lg font-bold">Toolscard</div>
        <ToolsCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          }
        />
      </PageRow>
      <PageRow>
        <div className="text-lg font-bold">Text Input</div>
        <TextInput
          editable={true}
          selected={1}
          unit="TB"
          placeholder="1.0"
          name={'Example'}
        />
      </PageRow>
      <PageRow>
        <div className="text-lg font-bold">History Card</div>
        {/* <HistoryCard
          priceHistory={69}
          icon={logos.Azure}
          title="Azure"
          description="Azure is a cloud computing platform that makes it easy to build, deploy, and manage applications and services."
        /> */}
      </PageRow>
    </div>
  )
}

export default Home

function PageRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 grid grid-cols-4 justify-center gap-5">{children}</div>
  )
}

function ChevronRight({}) {
  return (
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
  )
}
