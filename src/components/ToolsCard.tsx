import Image from 'next/image'
interface ToolsCardProps {
  title?: string
  icon?: any
  description?: string
  uri?: string
  soon?: boolean
}

const ToolsCard = ({
  soon = false,
  title = 'Pricing Calculator',
  icon,
  description = 'Estimate the Cost of running snowflake in Various Cloud Providers and Regions',
  uri = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
}: ToolsCardProps) => {
  return (
    <div className="card image-full h-52 w-72 shadow-2xl hover:shadow-accent focus:shadow-accent-focus">
      <figure>
        <Image src={uri} alt="Image" fill />
      </figure>
      <div className="card-body grid grid-cols-5 gap-2">
        <div className="col-span-4 flex flex-col items-start justify-between gap-4">
          <div className="card-title text-left text-md leading-10">{title}</div>
          <div className="text-left text-xs">{description}</div>
          <div className="text-sm font-medium">
            <div className="flex flex-row items-center">
              {soon ? 'Coming Soon' : 'View'}
              <span className="mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-start">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default ToolsCard
