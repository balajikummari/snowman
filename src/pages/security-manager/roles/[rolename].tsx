import Breadcrumbs from 'components/Breadcrumbs'
import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  getAll,
  getAllDatabases,
  getAllIntegrations,
  getAllResourceMonitors,
  getAllRoles,
  getAllSchemas,
  getAllUsers,
  getAllWarehouses,
  getGrants,
  getGrantsToRole,
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

const globalPrivileges = {
  CREATE: {
    ACCOUNT: ['ACCOUNT'],
    'DATA EXCHANGE LISTING': ['ACCOUNT'],
    DATABASE: ['ACCOUNT'],
    INTEGRATION: ['ACCOUNT'],
    'NETWORK POLICY': ['ACCOUNT'],
    ROLE: ['ACCOUNT'],
    SHARE: ['ACCOUNT'],
    USER: ['ACCOUNT'],
    WAREHOUSE: ['ACCOUNT'],
  },
  'APPLY MASKING POLICY': { '': ['ACCOUNT'] },
  'APPLY ROW ACCESS POLICY': { '': ['ACCOUNT'] },
  'APPLY SESSIPOLICY': { '': ['ACCOUNT'] },
  'ATTACH POLICY': { '': ['ACCOUNT'] },
  'EXECUTE TASK': { '': ['ACCOUNT'] },
  'IMPORT SHARE': { '': ['ACCOUNT'] },
  'MANAGE GRANTS': { '': ['ACCOUNT'] },
  MONITOR: { '': ['ACCOUNT'] },
}
const accountObjectPrivileges = {
  MONITOR: {
    '': ['USER', 'RESOURCE MONITOR', 'WAREHOUSE', 'DATABASE'],
  },
  MODIFY: {
    '': ['RESOURCE MONITOR', 'WAREHOUSE', 'DATABASE'],
  },
  USAGE: {
    '': ['USER', 'WAREHOUSE', 'DATABASE', 'INTEGRATION'],
  },
  OPERATE: {
    '': ['WAREHOUSE'],
  },
  'CREATE SCHEMA': {
    '': ['DATABASE'],
  },
  'IMPORTED PRIVILEGES': {
    '': ['DATABASE'],
  },
  USE_ANY_ROLE: {
    '': ['INTEGRATION'],
  },
}
const schemaObjectPrivileges = {
  SELECT: {
    '': ['TABLE', 'VIEW', 'MATERIALIZED VIEW', 'STREAM'],
  },
  INSERT: {
    '': ['TABLE'],
  },
  UPDATE: {
    '': ['TABLE'],
  },
  DELETE: {
    '': ['TABLE'],
  },
  TRUNCATE: {
    '': ['TABLE'],
  },
  REFERENCES: {
    '': ['TABLE', 'VIEW', 'MATERIALIZED VIEW'],
  },
  USAGE: {
    '': ['SEQUENCE', 'FUNCTION', 'PROCEDURE', 'FILE FORMAT', 'STAGE'],
  },
  READ: {
    '': ['STAGE'],
  },
  WRITE: {
    '': ['STAGE'],
  },
  MONITOR: {
    '': ['PIPE', 'TASK'],
  },
  OPERATE: {
    '': ['PIPE', 'TASK'],
  },
  APPLY: {
    '': ['MASKING POLICY', 'ROW ACCESS POLICY', 'SESSION POLICY', 'TAG'],
  },
}
const schemaPrivileges = {
  MODIFY: { '': ['SCHEMA', 'ALL SCHEMAS IN DATABASE'] },
  MONITOR: { '': ['SCHEMA', 'ALL SCHEMAS IN DATABASE'] },
  USAGE: { '': ['SCHEMA', 'ALL SCHEMAS IN DATABASE'] },
  CREATE: {
    TABLE: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    'EXTERNAL TABLE': ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    VIEW: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    'MATERIALIZED VIEW': ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    'MASKING POLICY': ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    'ROW ACCESS POLICY': ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    SESSIPOLICY: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    TAG: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    SEQUENCE: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    FUNCTION: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    PROCEDURE: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    'FILE FORMAT': ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    STAGE: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    PIPE: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    STREAM: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
    TASK: ['SCHEMA', 'ALL SCHEMAS IN DATABASE'],
  },
}

interface privilegeModel {
  [key: string]: {
    [key: string]: {
      [key: string]: string[]
    }
  }
}

const privilegeTypes: privilegeModel = {
  Global: globalPrivileges,
  'Account Object': accountObjectPrivileges,
  Schema: schemaPrivileges,
}
const Home: NextPage = ({
  grants,
  roles,
  warehouses,
  schemas,
  databases,
  integrations,
  users,
  resourceMonitors,
}: any) => {
  const session = useSession()
  const router = useRouter()
  const data = React.useMemo(() => (grants !== null ? grants : []), [])
  const [privilegeCategory, setPrivilegeCategory] = React.useState('')
  const [privilegeName, setPrivilegeName] = React.useState('')
  const [privilegeItem, setPrivilegeItem] = React.useState<string | null>(null)
  const [privilegeTargetType, setPrivilegeTargetType] = React.useState('')
  const [privilegeTargetObject, setPrivilegeTargetObject] = React.useState('')

  useEffect(() => {
    setPrivilegeTargetObject('')
    setPrivilegeTargetType('')
    setPrivilegeItem(null)
    setPrivilegeName('')
  }, [privilegeCategory])
  useEffect(() => {
    setPrivilegeTargetObject('')
    setPrivilegeTargetType('')
    setPrivilegeItem(null)
    if (privilegeName !== '') {
      if (
        typeof privilegeTypes[privilegeCategory][privilegeName] !== undefined &&
        Object.keys(privilegeTypes[privilegeCategory][privilegeName]).length ==
          1
      ) {
        setPrivilegeItem('')
      }
    }
  }, [privilegeName])
  useEffect(() => {
    setPrivilegeTargetObject('')
    setPrivilegeTargetType('')
  }, [privilegeItem])

  useEffect(() => {
    setPrivilegeTargetObject('')
  }, [privilegeTargetType])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Privilege',
        accessor: 'privilege',
        Filter: Filters,
      },
      {
        Header: 'Granted On',
        accessor: 'granted_on',
        Filter: Filters,
      },
      {
        Header: 'Name',
        accessor: 'name',
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
  const name = router.query.rolename as string

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
                <h1 className="text-2xl font-bold">Privileges</h1>
                <div className="flex flex-row justify-between">
                  <label
                    htmlFor="grant-privilege-modal"
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
                    <div>Grant New Privilege</div>
                  </label>
                </div>
              </div>
              <table className="table" {...getTableProps()}>
                {headerGroups.map((headerGroup: any) => (
                  <tr
                    className="bg-secondary bg-opacity-20 "
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
                        <div className="">{column.render('Filter')}</div>
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
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                        <td>
                          <label
                            htmlFor={`delet${
                              row.values.privilege +
                              row.values.name +
                              row.values.granted_on
                            }`}
                            className="btn btn-ghost btn-sm text-primary underline hover:bg-transparent"
                          >
                            Revoke
                          </label>
                          <input
                            type="checkbox"
                            id={`delet${
                              row.values.privilege +
                              row.values.name +
                              row.values.granted_on
                            }`}
                            className="modal-toggle"
                          />
                          <div className="modal-bottom sm:modal-middle modal">
                            <div className="modal-box">
                              <h3 className="text-lg font-bold">
                                Confirm Revoke
                              </h3>
                              <p className="py-4">
                                Are you sure you want to Revoke this privilege
                                {' ' + row.values.privilege}?
                              </p>
                              <div className="modal-action">
                                <button
                                  className="btn btn-error"
                                  onClick={() => {
                                    revokePrivilege(
                                      row.values.privilege,
                                      row.values.granted_on == 'ACCOUNT'
                                        ? ''
                                        : row.values.name,
                                      row.values.granted_on,
                                      router.query.rolename,
                                      router.query.cred,
                                      session.data
                                    )
                                  }}
                                >
                                  Yes
                                </button>
                                <label
                                  htmlFor={`delet${
                                    row.values.privilege +
                                    row.values.name +
                                    row.values.granted_on
                                  }`}
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
                  {[1, 10, 20, grants.length].map((pageSize) => (
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
            <div className="text text-lg text-error">
              {' '}
              Insufficient privileges to operate on account{' '}
            </div>
          ) : (
            <p className="text text-lg text-accent">No Credentials Selected</p>
          )}
        </div>
        <input
          type="checkbox"
          id="grant-privilege-modal"
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
              <div>Grant Privilege</div>
            </h3>
            <form
              className="form-control w-full items-stretch justify-center gap-4 p-10"
              onSubmit={(e: any) => {
                e.preventDefault()
                grantPrivilege(
                  privilegeName,
                  privilegeItem,
                  privilegeTargetType,
                  privilegeTargetObject,
                  router.query.rolename,
                  router.query.cred,
                  session.data
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
                  <label htmlFor="privilege_category" className="text-sm">
                    New Privilege
                  </label>
                  <select
                    name="privilege_category"
                    id="privilege_category"
                    className="select select-bordered w-auto"
                    required
                    onChange={(e) => {
                      setPrivilegeCategory(e.target.value)
                    }}
                    value={privilegeCategory}
                  >
                    <option value="">Select Category</option>
                    {Object.keys(privilegeTypes).map((privilegeType: any) => (
                      <option key={privilegeType} value={privilegeType}>
                        {privilegeType}
                      </option>
                    ))}
                  </select>
                  {privilegeCategory !== '' ? (
                    <div className="flex flex-col">
                      <label htmlFor="privilege_name" className="text-sm">
                        Privilege:
                      </label>
                      <select
                        name="privilege_name"
                        id="privilege_name"
                        className="select select-bordered w-auto"
                        required
                        onChange={(e) => {
                          setPrivilegeName(e.target.value)
                        }}
                        value={privilegeName}
                      >
                        <option value="">Select Privilege</option>
                        {Object.keys(privilegeTypes[privilegeCategory]).map(
                          (opt: any) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  ) : (
                    <></>
                  )}
                  {privilegeName !== '' &&
                  typeof privilegeTypes[privilegeCategory][privilegeName] !==
                    'undefined' &&
                  Object.keys(privilegeTypes[privilegeCategory][privilegeName])
                    .length > 1 ? (
                    <div className="flex flex-col">
                      <label htmlFor="privilege_item" className="text-sm">
                        Select Item
                      </label>
                      <select
                        name="privilege_item"
                        id="privilege_item"
                        className="select select-bordered w-auto"
                        required
                        onChange={(e) => {
                          setPrivilegeItem(e.target.value)
                        }}
                        value={privilegeItem || undefined}
                      >
                        <option value="">Select Item</option>
                        {Object.keys(
                          privilegeTypes[privilegeCategory][privilegeName]
                        ).map((opt: any) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                  {privilegeItem !== null ? (
                    <div className="flex flex-col">
                      <label htmlFor="privilege_item" className="text-sm">
                        Select TargetType
                      </label>
                      <select
                        name="privilege_target"
                        id="privilege_target"
                        className="select select-bordered w-auto"
                        required
                        onChange={(e) => {
                          setPrivilegeTargetType(e.target.value)
                        }}
                        value={privilegeTargetType}
                      >
                        <option value="">Select Item</option>
                        {privilegeTypes?.[privilegeCategory]?.[privilegeName]?.[
                          privilegeItem
                        ]?.map((opt: any) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                  {privilegeItem !== null &&
                  privilegeTargetType !== '' &&
                  privilegeTargetType !== 'ACCOUNT' ? (
                    <div className="flex flex-col">
                      <label htmlFor="privilege_item" className="text-sm">
                        Select Target Object
                      </label>
                      <select
                        name="privilege_target"
                        id="privilege_target"
                        className="select select-bordered w-auto"
                        required
                        onChange={(e) => {
                          setPrivilegeTargetObject(e.target.value)
                        }}
                        value={privilegeTargetObject}
                      >
                        <option value="">Select Object</option>
                        {privilegeTargetType == 'USER'
                          ? users.map((user: any) => (
                              <option key={user.name} value={user.name}>
                                {user.name}
                              </option>
                            ))
                          : privilegeTargetType == 'ROLE'
                          ? roles.map((role: any) => (
                              <option key={role.name} value={role.name}>
                                {role.name}
                              </option>
                            ))
                          : privilegeTargetType == 'WAREHOUSE'
                          ? warehouses.map((warehouse: any) => (
                              <option
                                key={warehouse.name}
                                value={warehouse.name}
                              >
                                {warehouse.name}
                              </option>
                            ))
                          : privilegeTargetType == 'DATABASE'
                          ? databases.map((database: any) => (
                              <option key={database.name} value={database.name}>
                                {database.name}
                              </option>
                            ))
                          : privilegeTargetType == 'SCHEMA'
                          ? Object.keys(schemas).map((dbName: any) =>
                              schemas[dbName].map((schema: any) => (
                                <option
                                  key={`${dbName}.${schema.name}`}
                                  value={`${dbName}.${schema.name}`}
                                >
                                  {`${dbName}.${schema.name}`}
                                </option>
                              ))
                            )
                          : privilegeTargetType == 'RESOURCE MONITOR'
                          ? resourceMonitors.map((resourceMonitor: any) => (
                              <option
                                key={resourceMonitor.name}
                                value={resourceMonitor.name}
                              >
                                {resourceMonitor.name}
                              </option>
                            ))
                          : privilegeTargetType == 'INTEGRATION'
                          ? integrations.map((integrations: any) => (
                              <option
                                key={integrations.name}
                                value={integrations.name}
                              >
                                {integrations.name}
                              </option>
                            ))
                          : privilegeTargetType == 'ALL SCHEMAS IN DATABASE'
                          ? databases.map((database: any) => (
                              <option key={database.name} value={database.name}>
                                {database.name}
                              </option>
                            ))
                          : null}
                      </select>
                    </div>
                  ) : null}
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
                  Add Privilege
                </button>
                <label
                  htmlFor="grant-privilege-modal"
                  className="btn btn-outline"
                >
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
  const { rolename } = context.query

  let credentialsId = context.query.cred

  const session = await getSession(context)

  const email = session?.user?.email
  if (!email) {
    return { props: { grants: [], roles: [] } }
  }
  const data = await getAll(credentialsId, email)

  let warehousesData = JSON.parse(safeJsonStringify(data?.warehouses))

  let integrationsData = JSON.parse(safeJsonStringify(data?.integrations))

  let databasesData = JSON.parse(safeJsonStringify(data?.databases))

  let usersData = JSON.parse(safeJsonStringify(data?.users))

  let resourceMonitorsData = JSON.parse(
    safeJsonStringify(data?.resourceMonitors)
  )

  let schemasData = JSON.parse(safeJsonStringify(data?.schemas))

  const rolesData = JSON.parse(safeJsonStringify(data?.roles))
  const grants = await getGrantsToRole(credentialsId, email, rolename)

  if (!grants) {
    return {
      props: {
        grants: [],
        roles: rolesData,
        warehouses: warehousesData,
        integrations: integrationsData,
        databases: databasesData,
        users: usersData,
        resourceMonitors: resourceMonitorsData,
        schemas: schemasData,
      },
    }
  }
  let grantsData = JSON.parse(safeJsonStringify(grants))
  return {
    props: {
      grants: grantsData,
      roles: rolesData,
      warehouses: warehousesData,
      integrations: integrationsData,
      databases: databasesData,
      users: usersData,
      resourceMonitors: resourceMonitorsData,
      schemas: schemasData,
    },
  }
}

export default Home

async function grantPrivilege(
  privilegeName: any,
  privilegeItem: any,
  privilegeTargetType: any,
  privilegeTargetObject: any,
  rolename: any,
  credentialsId: any,
  data: any
) {
  if (!credentialsId) {
    return
  }

  if (
    !privilegeName ||
    privilegeItem === null ||
    !privilegeTargetType ||
    !rolename
  ) {
    return
  }
  await axios.post(`/api/security-manager/role/${rolename}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      privilegeName: privilegeName,
      privilegeItem: privilegeItem,
      privilegeTargetType: privilegeTargetType,
      privilegeTargetObject: privilegeTargetObject,
      session: data,
      credentialsId: credentialsId,
    },
  })
  window.location.reload()
}
async function revokePrivilege(
  privilegeName: any,
  privilegeObjectName: any,
  privilegeTargetType: any,
  rolename: any,
  credentialsId: any,
  data: any
) {
  if (!credentialsId) {
    return
  }

  if (
    !privilegeName ||
    privilegeObjectName === null ||
    !privilegeTargetType ||
    !rolename
  ) {
    return
  }
  await axios.delete(`/api/security-manager/role/${rolename}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      privilegeName: privilegeName,
      privilegeObjectName: privilegeObjectName,
      privilegeTargetType: privilegeTargetType,
      session: data,
      credentialsId: credentialsId,
    },
  })
  window.location.reload()
}
