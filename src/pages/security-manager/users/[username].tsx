import Breadcrumbs from 'components/Breadcrumbs'
import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  getAllRoles,
  getGrants,
  getUser,
} from 'src/lib/functions/snowflake-security-manager'
import safeJsonStringify from 'safe-json-stringify'
import { useTable, useSortBy, usePagination, useFilters } from 'react-table'
import React, { useEffect } from 'react'
import axios from 'axios'

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

const Home: NextPage = ({ user, grants, roles }: any) => {
  const session = useSession()
  const router = useRouter()
  const data = React.useMemo(() => (grants !== null ? grants : []), [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Role',
        accessor: 'role',
        Filter: Filters,
      },
      {
        Header: 'Granted By',
        accessor: 'granted_by',
        Filter: Filters,
      },
      {
        Header: 'Created On',
        accessor: 'created_on',
        Filter: Filters,
        Cell: (row: any) => <span>{new Date(row.value).toLocaleString()}</span>,
      },
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
  const name = user.find((user: any) => user.property === 'NAME').value

  return (
    <div className="flex min-h-screen flex-col items-center bg-base-200">
      <Head>
        <title>Snowflake Tools</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full px-40">
        <div className="my-10 flex w-full flex-row items-start justify-between">
          <Breadcrumbs />
        </div>
        <div className="card w-full rounded-sm bg-base-100 p-4">
          <div className="flex flex-row items-center justify-start gap-5">
            <div className="avatar placeholder">
              <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
                <img
                  src={`https://avatars.dicebear.com/api/micah/${name}.svg`}
                />
              </div>
            </div>
            <div className="text-lg font-semibold">{name}</div>
          </div>
        </div>
        <div className="flex flex-col">
          {grants ? (
            <>
              {/* add title to table*/}
              <div className="flex flex-row justify-between py-6">
                <h1 className="text-2xl font-bold">Roles</h1>
                <div className="flex flex-row justify-between">
                  <label
                    htmlFor="grant-role-modal"
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
                    <div>Grant New role</div>
                  </label>
                </div>
              </div>
              <table className="table" {...getTableProps()}>
                {headerGroups.map((headerGroup: any) => (
                  <tr
                    className="hover bg-secondary bg-opacity-20 "
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
                      </th>
                    ))}
                    <th>Options</th>
                  </tr>
                ))}{' '}
                <tbody {...getTableBodyProps()}>
                  {page.map((row: any) => {
                    prepareRow(row)
                    return (
                      <tr className="hover" {...row.getRowProps()} key={row.id}>
                        {row.cells.map((cell: any) => (
                          <td
                            key={cell.id}
                            {...cell.getCellProps()}
                            isnumeric={cell.column.isNumeric}
                            onClick={(e) => console.log(cell.column.id)}
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
                            htmlFor={`delet${row.values.role}`}
                            className="btn btn-ghost btn-sm text-primary underline hover:bg-transparent"
                          >
                            Revoke
                          </label>
                          <input
                            type="checkbox"
                            id={`delet${row.values.role}`}
                            className="modal-toggle"
                          />
                          <div className="modal-bottom sm:modal-middle modal">
                            <div className="modal-box">
                              <h3 className="text-lg font-bold">
                                Confirm Revoke
                              </h3>
                              <p className="py-4">
                                Are you sure you want to Revoke this role
                                {' ' + row.values.role}?
                              </p>
                              <div className="modal-action">
                                <button
                                  className="btn btn-error"
                                  onClick={() =>
                                    revokeRole(
                                      row.values.role,
                                      name,
                                      session.data,
                                      router.query.cred
                                    )
                                  }
                                >
                                  Yes
                                </button>
                                <label
                                  htmlFor={`delet${row.values.role}`}
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
            </>
          ) : router.asPath.includes('?cred=') ? (
            <div className="text text-lg text-error">
              {' '}
              Insufficient privileges to operate on account{' '}
            </div>
          ) : (
            <p className="text text-lg text-accent">No Credentials Selected</p>
          )}
        </div>
        <input type="checkbox" id="grant-role-modal" className="modal-toggle" />
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
              <div>Grant New Role</div>
            </h3>
            <form
              className="form-control w-full items-stretch justify-center gap-4 p-10"
              onSubmit={(e: any) => {
                e.preventDefault()
                grantRole(
                  e.target.new_role.value,
                  name,
                  session.data,
                  router.query.cred
                )
              }}
            >
              <div className="flex flex-row gap-2">
                <div className="flex flex-row items-center justify-start gap-5">
                  <div className="avatar placeholder">
                    <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
                      <img
                        src={`https://avatars.dicebear.com/api/micah/${name}.svg`}
                      />
                    </div>
                  </div>
                  <div className="text-lg font-semibold">{name}</div>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between">
                <div className="form-control w-full">
                  <label htmlFor="new_role" className="text-sm">
                    New Role
                  </label>
                  <select
                    name="new_role"
                    id="new_role"
                    className="select select-bordered w-auto"
                    required
                  >
                    {roles.map((role: any) => (
                      <option key={role.name} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
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
                  Grant Role
                </button>
                <label htmlFor="grant-role-modal" className="btn btn-outline">
                  Cancel
                </label>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
//get serverside props
export async function getServerSideProps(context: any) {
  const { username } = context.query

  console.log(username)

  let credentialsId = context.query.cred

  const session = await getSession(context)

  const email = session?.user?.email
  if (!email) {
    return { props: { user: null, grants: [], roles: [] } }
  }

  const user = await getUser(credentialsId, email, username)

  if (!user) {
    return {
      props: {
        user: null,
        grants: [],
        roles: [],
      },
    }
  }

  let data = JSON.parse(safeJsonStringify(user))

  const roles = await getAllRoles(credentialsId, email)
  if (!roles) {
    return {
      props: {
        user: data,
        grants: [],
        roles: [],
      },
    }
  }
  const rolesData = JSON.parse(safeJsonStringify(roles))
  const grants = await getGrants(credentialsId, email, username)

  if (!grants) {
    return {
      props: {
        user: data,
        grants: [],
        roles: rolesData,
      },
    }
  }

  let grantsData = JSON.parse(safeJsonStringify(grants))
  return {
    props: {
      user: data,
      grants: grantsData,
      roles: rolesData,
    },
  }
}

export default Home

const grantRole = async (
  role: any,
  username: any,
  data: any,
  credentialsId: any
) => {
  console.log(data)
  //send credentials in body
  await axios.post(`/api/security-manager/user/role/${username}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      session: data,
      credentialsId: credentialsId,
      username: username,
      role: role,
    },
  })
  window.location.reload()
}

const revokeRole = async (
  role: any,
  username: any,
  data: any,
  credentialsId: any
) => {
  //send credentials in body
  console.log(role)
  await axios.delete(`/api/security-manager/user/role/${username}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      session: data,
      credentialsId: credentialsId,
      username: username,
      role: role,
    },
  })
  window.location.reload()
}
