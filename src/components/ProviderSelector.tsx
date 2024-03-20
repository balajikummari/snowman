import React from 'react'

interface ProviderSelectorProps {
  editable: boolean
  options: { [key: string]: React.ReactNode }
  onSelect: (value: any) => any
  selected: string
}

const ProviderSelector = ({
  options,
  selected,
  editable,
  onSelect,
}: ProviderSelectorProps) => {
  const handleClick = (value: string): any => {
    onSelect && onSelect(value)
  }
  return (
    <>
      {Object.keys(options).map((optionKey) => (
        <div key={optionKey}>
          <div className="m-1">
            {/* shadow-[0_0px_30px_0px_rgba(0,0,0,1)] */}
            <label
              htmlFor={optionKey + 'modal'}
              className={`modal-button card  flex w-40 flex-row items-center justify-around rounded p-4  sm:w-80 ${
                selected === optionKey
                  ? 'bg-base-100 shadow-inner shadow-secondary'
                  : 'bg-base-300 opacity-70 shadow-sm hover:shadow-[0_0px_30px_0px_rgba(0,0,0,1)] hover:shadow-primary'
              }`}
            >
              <div>{options[optionKey]}</div>
              <div className="font-semibold">{optionKey}</div>
              {selected === optionKey ? (
                <div className="text-primary ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <div className="text-xs text-primary underline">change</div>
              )}
            </label>
            <input
              type="checkbox"
              id={optionKey + 'modal'}
              className="modal-toggle"
              disabled={!editable}
            />
            <div className="modal">
              <div className="modal-box rounded">
                <div className="text-md font-medium">
                  Are Your Sure You want to change Default Cloud Provider to
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-md">{options[optionKey]}</div>
                  <div className="text-md font-medium">{optionKey}</div>
                </div>
                <div className="modal-action">
                  <label
                    htmlFor={optionKey + 'modal'}
                    className="btn btn-outline btn-primary w-auto rounded"
                  >
                    No
                  </label>
                  <label
                    htmlFor={optionKey + 'modal'}
                    className="btn btn-primary w-auto rounded"
                    onClick={() => handleClick(optionKey)}
                  >
                    Yes
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ProviderSelector
