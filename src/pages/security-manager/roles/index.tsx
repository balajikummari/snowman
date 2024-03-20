import Breadcrumbs from 'components/Breadcrumbs'
import Dropdown from 'components/Dropdown'
import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getCredentialsFromSF } from 'src/lib/functions/snowflake-credentials'
import {
  getAllRoles,
  getAllUsers,
  getAllWarehouses,
} from 'src/lib/functions/snowflake-security-manager'
import safeJsonStringify from 'safe-json-stringify'
import { useTable, useSortBy, usePagination, useFilters } from 'react-table'
import React, { useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
const Filters = ({ column }: any) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  )
}

const TriangleUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
)

const TriangleDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
)
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

const Home: NextPage = ({ users, credentialsList, warehouses, roles }: any) => {
  const session = useSession()
  const status = session.status

  const router = useRouter()
  const data = React.useMemo(() => (roles !== null ? roles : []), [roles])
  const [currentSelection, setCurrentSelection] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if (credentialsList.length > 0) {
      chooseCredentials(credentialsList[0].NAME)
    }
  }, [])
  useEffect(() => {
    if (!router.asPath.includes('?cred=')) {
      setCurrentSelection('')
    } else {
      const credentialsId = router.query.cred
      const credentials = credentialsList.find(
        (credential: any) => credential.ID === credentialsId
      )
      setCurrentSelection(`${credentials.NAME} (${credentials.USERNAME})`)
    }
  }, [router.query.cred])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Filter: Filters,
      },
      {
        Header: 'Assigned to Users',
        accessor: 'assigned_to_users',
        Filter: Filters,
      },
      {
        Header: 'Created On',
        accessor: 'created_on',
        Filter: Filters,
        Cell: (row: any) => <span>{new Date(row.value).toLocaleString()}</span>,
      },
      {
        Header: 'Owner',
        accessor: 'owner',
        Filter: Filters,
      },
      // {
      //   Header: 'Comment',
      //   accessor: 'comment',
      //   Filter: Filters,
      // },
    ],
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  }: any = useTable({ columns, data }, useFilters, useSortBy, usePagination)
  const { pageIndex, pageSize } = state

  const chooseCredentials = (credentialsName: any) => {
    //find the credential by name
    credentialsName = credentialsName.split(' (')[0]
    const credential = credentialsList.find(
      (credential: any) => credential.NAME === credentialsName
    )
    if (
      router !== undefined &&
      router.query !== undefined &&
      router.query.key === undefined &&
      !router.asPath.includes('?cred=')
    ) {
      router.push({ query: { cred: credential.ID } })
    }
    if (
      router !== undefined &&
      router.query !== undefined &&
      router.query.key === undefined &&
      router.asPath.includes('?cred=')
    ) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          cred: credential.ID,
        },
      })
    }
  }
  const handleSelect = (e: any) => {
    chooseCredentials(e.target.value)
    setLoading(true)
  }

  useEffect(() => {
    setLoading(false)
  }, [roles, router.query.cred])
  if (status === 'authenticated') {
    return (
      <div className="flex min-h-screen flex-col items-center bg-base-200">
        <Head>
          <title>Security Manager</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className=" w-full px-40">
          <div className="my-10 flex w-full flex-row items-start justify-between">
            <Breadcrumbs />
            <Dropdown
              size={'small'}
              name={''}
              selected={currentSelection}
              options={credentialsList.map(
                (credential: any) =>
                  `${credential.NAME} (${credential.USERNAME})`
              )}
              editable={true}
              onSelect={handleSelect}
            />
            {/* <div>{credentialsList}</div> */}
          </div>
          {!loading ? (
            <>
              <div className="w flex flex-col">
                {/* Table of all users */}
                {roles && roles.length > 0 ? (
                  <>
                    {/* add title to table*/}
                    <div className="flex flex-row justify-between p-4">
                      <h1 className="text-2xl font-bold">Roles</h1>
                      <div className="flex flex-row justify-between">
                        <label
                          htmlFor="add-role-modal"
                          className="btn btn-outline btn-secondary flex flex-row justify-between gap-2 rounded py-2 px-4 font-bold"
                        >
                          <div>
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
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </div>
                          <div>Add Role</div>
                        </label>
                      </div>
                    </div>
                    <table className="table" {...getTableProps()}>
                      {headerGroups.map((headerGroup: any) => (
                        <tr
                          className=" bg-secondary bg-opacity-50"
                          {...headerGroup.getHeaderGroupProps()}
                          key={headerGroup}
                        >
                          {headerGroup.headers.map((column: any) => (
                            <th
                              key={column.id}
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                              isnumeric={column.isNumeric}
                            >
                              <div className="flex flex-row gap-2">
                                {column.render('Header')}

                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <TriangleDownIcon aria-label="sorted descending" />
                                  ) : (
                                    <TriangleUpIcon aria-label="sorted ascending" />
                                  )
                                ) : null}
                              </div>
                              {/* <div className="">{column.render('Filter')}</div> */}
                            </th>
                          ))}
                          <th>Options</th>
                        </tr>
                      ))}{' '}
                      <tbody {...getTableBodyProps()}>
                        {page.map((row: any) => {
                          prepareRow(row)
                          return (
                            <tr
                              className="hover"
                              {...row.getRowProps()}
                              key={row.id}
                            >
                              {row.cells.map((cell: any) => (
                                <td
                                  key={cell.id}
                                  {...cell.getCellProps()}
                                  isnumeric={cell.column.isNumeric}
                                  onClick={() => {
                                    //go to user page
                                    if (cell.column.id === 'name') {
                                      router.push(
                                        `/security-manager/roles/${row.values.name}?cred=${router.query.cred}`
                                      )
                                      setLoading(true)
                                    }
                                  }}
                                  className={`${
                                    cell.column.id === 'name'
                                      ? 'cursor-pointer text-primary'
                                      : ''
                                  }`}
                                >
                                  {cell.render('Cell')}
                                </td>
                              ))}
                              <td>
                                <label
                                  htmlFor={`delet${row.values.name}`}
                                  className="btn btn-ghost btn-sm text-primary underline hover:bg-transparent"
                                >
                                  Remove
                                </label>
                                <input
                                  type="checkbox"
                                  id={`delet${row.values.name}`}
                                  className="modal-toggle"
                                />
                                <div className="modal-bottom sm:modal-middle modal">
                                  <div className="modal-box">
                                    <h3 className="text-lg font-bold">
                                      Confirm Delete
                                    </h3>
                                    <p className="py-4">
                                      Are you sure you want to delete the role{' '}
                                      {row.values.name}?
                                    </p>
                                    <div className="modal-action">
                                      <button
                                        className="btn btn-error"
                                        onClick={(e) => {
                                          removeRole(
                                            row.values.name,
                                            session.data,
                                            router.query.cred
                                          )
                                        }}
                                      >
                                        Yes
                                      </button>
                                      <label
                                        htmlFor={`delet${row.values.name}`}
                                        className="btn btn-outline"
                                      >
                                        no
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <div className="flex flex-row items-center justify-end gap-5 p-4">
                      <span className="text">
                        Page{' '}
                        <strong>
                          {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                      </span>
                      <span className="text">
                        Go to Page:{' '}
                        <input
                          className="input input-bordered w-20  focus:outline-none"
                          min={1}
                          type="number"
                          defaultValue={pageIndex + 1}
                          onChange={(e) => {
                            const pageNumber = e.target.value
                              ? Number(e.target.value) - 1
                              : 0
                            gotoPage(pageNumber)
                          }}
                        />
                      </span>
                      <select
                        className="select select-bordered focus:outline-none"
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                      >
                        {[1, 10, 20, users.length].map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                          </option>
                        ))}
                      </select>
                      <div>
                        {canPreviousPage ? (
                          <button
                            className="btn btn-ghost btn-circle"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                          >
                            {<ChevronLeftIcon />}
                          </button>
                        ) : null}
                        {canNextPage ? (
                          <button
                            className="btn btn-ghost btn-circle"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                          >
                            {<ChevronRightIcon />}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : router.asPath.includes('?cred=') ? (
                  <div className="text text-lg  font-semibold text-error">
                    <div className="text-xl ">Error</div>
                    <li>
                      Please check if you have sufficient privileges to access
                      this information (USERADMIN Role).
                    </li>
                    <li>
                      Please check that your Snowflake account is not disabled.
                    </li>
                    <li>Please verify if your credentials are valid.</li>
                  </div>
                ) : (
                  <>
                    <p className="text text-xl font-semibold text-accent">
                      No Credentials Selected
                    </p>
                    <br />

                    <Link
                      passHref
                      href="/settings"
                      className="text-primary underline"
                    >
                      You can manage your credentials here
                    </Link>
                  </>
                )}
              </div>
              <input
                type="checkbox"
                id="add-role-modal"
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box rounded">
                  <h3 className="flex flex-row items-center justify-start gap-2 text-lg font-medium text-primary">
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
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>Add New Role</div>
                  </h3>
                  <form
                    className="form-control w-full items-stretch justify-center gap-4"
                    onSubmit={(e: any) => {
                      e.preventDefault()
                      addRole(
                        e.target.rolename.value,
                        e.target.comment.value,
                        session.data,
                        router.query.cred
                      )
                    }}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <div className="form-control w-full p-4">
                        <label htmlFor="rolename" className="text-sm">
                          Name
                        </label>
                        <input
                          type="text"
                          name="rolename"
                          id="rolename"
                          className="input input-bordered"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div className="form-control w-full p-4">
                        <label htmlFor="comment" className="text-sm">
                          Comment
                        </label>
                        <textarea
                          name="comment"
                          id="comment"
                          className="input input-bordered"
                          required
                        />
                      </div>
                    </div>
                    <div className="modal-action">
                      <button type="submit" className="btn btn-primary">
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>{' '}
                        Add Role
                      </button>
                      <label
                        htmlFor="add-role-modal"
                        className="btn btn-outline"
                      >
                        Cancel
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div className="flex animate-pulse flex-row items-center justify-center  text-2xl">
              <span className="font-semibold text-primary">Loading</span>
            </div>
          )}
        </main>
      </div>
    )
  }
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Head>
        <title>Security Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        Not Signed in
      </main>
    </div>
  )
}
//get serverside props
export async function getServerSideProps(context: any) {
  //get users from api endpoint
  let credentialsId = context.query.cred

  const session = await getSession(context)

  const email = session?.user?.email
  if (!email) {
    return {
      props: {
        users: null,
        credentialsList: [],
        roles: [],
        warehouses: [],
      },
    }
  }
  let credentialsList = await getCredentialsFromSF(email)
  // remove credentials that are not active
  credentialsList = credentialsList?.filter(
    (credential: any) => credential.SECURITYMANAGER === true
  )

  if (!credentialsId) {
    return {
      props: {
        users: null,
        credentialsList: credentialsList,
        roles: [],
        warehouses: [],
      },
    }
  }

  const users = await getAllUsers(credentialsId, email)

  if (!users) {
    return {
      props: {
        users: null,
        credentialsList: credentialsList,
        roles: [],
        warehouses: [],
      },
    }
  }

  let data = JSON.parse(safeJsonStringify(users))

  const warehouses = await getAllWarehouses(credentialsId, email)
  let warehousesData = JSON.parse(safeJsonStringify(warehouses))

  if (!warehouses) {
    return {
      props: {
        users: data,
        credentialsList: credentialsList,
        roles: [],
        warehouses: [],
      },
    }
  }

  const roles = await getAllRoles(credentialsId, email)
  if (!roles) {
    return {
      props: {
        users: data,
        credentialsList: credentialsList,
        roles: [],
        warehouses: [],
      },
    }
  }

  let rolesData = JSON.parse(safeJsonStringify(roles))

  return {
    props: {
      users: data,
      credentialsList: credentialsList,
      warehouses: warehousesData,
      roles: rolesData,
    },
  }
}

export default Home

const removeRole = async (name: any, data: any, credentialsId: any) => {
  //send credentials in body
  await axios.delete(`/api/security-manager/user/role`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      rolename: name,
      session: data,
      credentialsId: credentialsId,
    },
  })
  window.location.reload()
}
const addRole = async (
  rolename: any,
  comment: any,
  data: any,
  credentialsId: any
) => {
  //alert(credentialsId)
  //send credentials in body

  await axios.post(`/api/security-manager/user/role`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      session: data,
      credentialsId: credentialsId,
      rolename: rolename,
      comment: comment,
    },
  })
  window.location.reload()
}
