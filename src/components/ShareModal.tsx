import React from 'react'
interface ShareModalProps {
  editable: boolean
  isOwner: boolean
  onSelect: (value: any) => void
}
const ShareModal = ({ onSelect, editable, isOwner }: ShareModalProps) => {
  const [copied, setCopied] = React.useState(false)
  return (
    <>
      <label
        htmlFor="my-modal-4"
        className="modal-button btn btn-ghost text-primary underline hover:bg-transparent "
      >
        <div className="flex flex-row items-center gap-2">
          <span style={{ textTransform: 'none' }}>Share</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
        </div>
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal  cursor-pointer ">
        <label className="modal-box relative rounded" htmlFor="">
          <div className="flex w-full flex-col items-start justify-center">
            <h3 className="text-lg font-bold">Share</h3>
            <div className="flex w-full  flex-row items-center justify-end">
              <label className="label cursor-pointer">
                <span className="label-text p-2">Editable</span>
                <input
                  type="checkbox"
                  name="editable"
                  onChange={onSelect}
                  className="toggle toggle-primary"
                  defaultChecked={editable}
                  disabled={!isOwner}
                />
              </label>
            </div>
            {/* Shareable link copy to clipboard field readonly input field */}

            <div className="text-sm font-medium">Shareable Link</div>
            <div className="flex w-full flex-row items-center justify-between gap-4">
              <input
                className="w-full rounded border-2 border-base-300 bg-transparent p-2"
                type="url"
                value={window.location.href}
                readOnly
              />
              <button
                className="border-gray-400 btn btn-ghost btn-circle  rounded border-2 p-2"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setCopied(true)
                }}
              >
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`alert alert-success rounded shadow-lg ${
                copied ? '' : 'hidden'
              }`}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Copied to Clipboard</span>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}

export default ShareModal
