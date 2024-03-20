import React from 'react'

interface SectionSelectorProps {
  options: { [key: string]: React.ReactNode }
  onSelect: (value: string) => any
}

const SectionSelector = ({
  options,
  onSelect,
  ...props
}: SectionSelectorProps) => {
  const [showMenu, setShowMenu] = React.useState(false)

  const handleClick = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="dropdown dropdown-hover text-md text-primary">
      <label
        tabIndex={0}
        className={
          'bg-light flex w-80 flex-row items-center justify-around rounded border border-secondary p-3 font-medium'
        }
        onClick={handleClick}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <div>Add Section</div>
        <svg
          className="ml-2 h-5 w-5 text-primary "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content menu w-80 rounded border border-secondary bg-base-100 shadow`}
      >
        {Object.keys(options).map((optionKey) => (
          <li key={optionKey}>
            <div
              onClick={() => {
                onSelect(optionKey)
                setShowMenu(false)
              }}
            >
              <div>{options[optionKey]}</div> <div>{optionKey}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SectionSelector
