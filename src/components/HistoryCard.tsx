import { MouseEventHandler } from 'react'
import { DeleteButton } from './DeleteButton'
interface HistoryCardProps {
  title: string
  icon?: any
  priceHistory: number
  description?: string
  when: Date
  onDelete: MouseEventHandler<any>
}

const HistoryCard = ({
  title,
  icon,
  description = 'You Estimated the Cost of running snowflake in Various Cloud Providers and Regions',
  priceHistory = 0,
  when,
  onDelete,
}: HistoryCardProps) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24
  const _MS_PER_HOURS = 1000 * 60 * 60
  const _MS_PER_MINUTES = 1000 * 60
  const _MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30

  // a and b are javascript Date objects
  function dateDiff(a: Date, b: Date) {
    // Discard the time and time-zone information.
    a = new Date(a)
    b = new Date(b)
    const utc1 = Date.UTC(
      a.getFullYear(),
      a.getMonth(),
      a.getDate(),
      a.getHours(),
      a.getMinutes()
    )
    const utc2 = Date.UTC(
      b.getFullYear(),
      b.getMonth(),
      b.getDate(),
      b.getHours(),
      b.getMinutes()
    )

    const minutes = Math.floor((utc2 - utc1) / _MS_PER_MINUTES)
    const hours = Math.floor((utc2 - utc1) / _MS_PER_HOURS)
    const days = Math.floor((utc2 - utc1) / _MS_PER_DAY)
    const months = Math.floor((utc2 - utc1) / _MS_PER_MONTH)

    if (minutes < 60) {
      return `${minutes} minutes`
    } else if (hours < 24) {
      return `${hours} hours`
    } else if (days < 30) {
      return `${days} days`
    }
    return `${months} months`
  }
  return (
    <div className="card h-60 shadow-2xl hover:shadow-accent focus:shadow-accent-focus">
      <div className="card-body flex flex-col bg-base-100">
        <div className="flex flex-row justify-between text-sm">
          <div className="text-left">{icon}</div>
          <div className="inline-flex items-center text-secondary">
            <span className="p-1">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            {dateDiff(when, new Date())} ago
          </div>
        </div>
        <div className="card-title text-lg">{title}</div>

        <div className="mt-2 pr-9 text-xs">{description}</div>
        <div className="fl ex-row mt-2  flex items-center justify-between font-medium">
          <div>
            <span className="text-xl">${priceHistory}</span>
            <span className="text-md">/Month</span>
          </div>
          <div>
            <DeleteButton onDelete={onDelete} editable={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryCard
