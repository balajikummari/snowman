import { DeleteButton } from 'components/DeleteButton'
import Dropdown from 'components/Dropdown'
import OutputBox from 'components/OutputBox'
import ShareModal from 'components/ShareModal'
import TextInput from 'components/TextInput'
import Link from 'next/link'
import React, { useEffect } from 'react'

interface TitleCardProps {
  name: string
  estimationBy: string
  isOwner: boolean
  estimationFor: string
  collapsed: boolean
  editable: boolean
  url: string
  onSelect: (value: any) => void
  handleCollapseAll: () => void
}

export function TitleCard({
  onSelect,
  handleCollapseAll,
  collapsed,
  isOwner,
  editable,
  name,
  estimationBy,
  estimationFor,
}: TitleCardProps) {
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
        <div className="collapse-card-title flex flex-row items-center justify-between text-md font-semibold">
          <div className="flex flex-row items-center justify-center gap-2">
            <input
              spellCheck="false"
              type="text"
              name="name"
              value={name}
              placeholder="Name this Estimate"
              className="input input-ghost w-full max-w-xs text-lg font-medium focus:outline-none"
              onChange={onSelect}
              disabled={!editable}
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-10 text-base">
            <button
              onClick={handleCollapseAll}
              className="font-semibold text-primary underline"
            >
              {collapsed ? (
                <div className="flex flex-row items-center gap-2">
                  <span>Expand All</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="font-bold text-primary"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex flex-row items-center gap-2">
                  <span>Collapse All</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-arrows-collapse"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z"
                    />
                  </svg>
                </div>
              )}
            </button>

            <ShareModal
              onSelect={onSelect}
              editable={editable}
              isOwner={isOwner}
            />
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
          <div className="flex w-96 flex-col justify-center p-4">
            <div className="mt-2 text-base">Estimation done by:</div>
            <div className="mt-4">
              <input
                type="text"
                value={estimationBy}
                name="estimationBy"
                placeholder="Enter name"
                className="input input-bordered input-secondary w-full font-medium focus:outline-none"
                onChange={onSelect}
                disabled={!editable}
              />
            </div>

            <div className="mt-2 text-base">Estimation done for:</div>
            <div className="mt-4">
              <input
                type="text"
                name="estimationFor"
                value={estimationFor}
                placeholder="Enter name"
                className="input input-bordered input-secondary w-full font-medium focus:outline-none"
                onChange={onSelect}
                disabled={!editable}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
