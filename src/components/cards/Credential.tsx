import axios from 'axios'
import { DeleteButton } from 'components/DeleteButton'
import React from 'react'

interface CredentailCardProps {
  id: string
  name: string
  email: string
  snowflakeURL: string
  username: string
  password: string
  schemaMigrator: boolean
  securityManager: boolean
}

const deleteCredentialsItem = async (id: any, emailId: any) => {
  //use axios to send delete request
  //send parameters in request body
  await axios.delete(`/api/credentials/${emailId}`, {
    data: {
      id: id,
    },
  })
}

const Credential = ({
  id,
  name,
  email,
  snowflakeURL,
  username,
  password,
  schemaMigrator,
  securityManager,
}: CredentailCardProps) => {
  const [editedName, setEditedName] = React.useState(name)
  const [editedPassword, setEditedPassword] = React.useState(password)
  const [editedSnowflakeURL, setEditedSnowflakeURL] =
    React.useState(snowflakeURL)
  const [editedUsername, setEditedUsername] = React.useState(username)
  const [editedSchemaMigrator, setEditedSchemaMigrator] =
    React.useState(schemaMigrator)
  const [editedSecurityManager, setEditedSecurityManager] =
    React.useState(securityManager)
  return (
    <div key={id}>
      <div className="card m-2 h-auto w-auto rounded-sm md:h-36">
        <div className="card-body flex flex-col justify-center bg-base-100">
          <div className="grid-rows-7 grid md:grid-cols-7">
            <div className="col-span-1 grid grid-flow-row-dense gap-2 text-md font-semibold ">
              <span className="text  text-sm font-medium opacity-60">
                Username
              </span>
              <div className="text-primary">{username}</div>
            </div>
            <div className="col-span-3 grid grid-flow-row-dense gap-2">
              <span className="text-sm font-medium opacity-60 ">
                Snowflake URL
              </span>
              {snowflakeURL}
            </div>

            <div className="col-span-1 grid grid-flow-row-dense gap-2">
              <span className="text-sm font-medium opacity-60 ">Show On</span>
              {schemaMigrator ? 'Schema Migrator ' : ''}
              <br />
              {securityManager ? 'Security Manager' : ''}
            </div>
            <div className="col-span-1 grid grid-flow-row-dense gap-2">
              <span className="text-sm font-medium opacity-60 ">
                Description
              </span>
              {name}
            </div>
            <div className="col-span-1 flex flex-row items-center justify-around ">
              <div>
                <label
                  htmlFor={id}
                  className="hover:text-primary-dark cursor-pointer text-base text-primary"
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </label>

                <input type="checkbox" id={id} className="modal-toggle" />
                <label htmlFor={id} className="modal cursor-pointer">
                  <label className="modal-box relative rounded" htmlFor="">
                    <h3 className="mb-6 text-base font-bold text-primary">
                      Edit this Snowflake Credentials
                    </h3>
                    <form
                      className="flex flex-col"
                      onSubmit={async (e) => {
                        e.preventDefault()
                        const {
                          ENAME,
                          ESNOWFLAKEURL,
                          EUSERNAME,
                          EPASSWORD,
                          ESCHEMAMIGRATOR,
                          ESECURITYMANAGER,
                        } = e.currentTarget
                        const response = await axios.put(
                          `/api/credentials/${email}`,
                          {
                            id: id,
                            name: ENAME.value,
                            snowflakeURL: ESNOWFLAKEURL.value,
                            username: EUSERNAME.value,
                            password: EPASSWORD.value,
                            emailId: email,
                            schemaMigrator: ESCHEMAMIGRATOR.checked,
                            securityManager: ESECURITYMANAGER.checked,
                          }
                        )
                        if (response.status === 200) {
                          window.location.reload()
                        }
                        if (response.status === 400) {
                          alert('Please enter valid credentials')
                        }
                      }}
                    >
                      <div className="justify- flex flex-col gap-7 py-3">
                        <div className="flex flex-row items-center justify-between">
                          <label
                            htmlFor="ESNOWFLAKEURL"
                            className="text-sm font-medium text-primary"
                          >
                            <div className="flex flex-row items-center gap-2">
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
                                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                              </svg>
                              <div>SnowflakeURL</div>
                            </div>
                          </label>
                          <input
                            type="text"
                            id="ESNOWFLAKEURL"
                            name="ESNOWFLAKEURL"
                            value={editedSnowflakeURL}
                            onChange={(e) =>
                              setEditedSnowflakeURL(e.target.value)
                            }
                            placeholder='eg: "https://md57071.ap-south-1.aws.snowflakecomputing.com"'
                            className="input input-sm w-full max-w-xs  items-end justify-end rounded-sm outline outline-2 outline-light-grey focus:outline-secondary"
                            required
                          />
                        </div>
                        <div className="flex flex-row  items-center justify-between">
                          <label
                            htmlFor="EUSERNAME"
                            className="text-sm font-medium text-primary"
                          >
                            <div className="flex flex-row items-center gap-2">
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
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              <div>Username</div>
                            </div>
                          </label>
                          <input
                            type="text"
                            id="EUSERNAME"
                            name="EUSERNAME"
                            value={editedUsername}
                            onChange={(e) => setEditedUsername(e.target.value)}
                            placeholder="Snowflake Username"
                            className="input input-sm w-full max-w-xs items-end justify-end rounded-sm outline outline-2 outline-light-grey focus:outline-secondary"
                            required
                          />
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <label
                            htmlFor="EPASSWORD"
                            className="text-sm font-medium text-primary"
                          >
                            <div className="flex flex-row items-center gap-2">
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
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                              <div>Password</div>
                            </div>
                          </label>
                          <input
                            type="password"
                            id="EPASSWORD"
                            name="EPASSWORD"
                            placeholder="New Password"
                            value={editedPassword}
                            onChange={(e) => setEditedPassword(e.target.value)}
                            required
                            className="input input-sm w-full max-w-xs items-end justify-end rounded-sm outline outline-2 outline-light-grey focus:outline-secondary"
                          />
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <label
                            htmlFor="ENAME"
                            className="text-sm font-medium text-primary"
                          >
                            <div className="flex flex-row items-center gap-2">
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
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <div>Description</div>
                            </div>
                          </label>
                          <input
                            type="text"
                            id="ENAME"
                            name="ENAME"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            placeholder="Description of the credentials"
                            className="input input-sm w-full max-w-xs  items-end justify-end rounded-sm outline outline-2 outline-light-grey focus:outline-secondary"
                            required
                          />
                        </div>
                        <div className=" mt-2 text-sm font-medium opacity-60">
                          Show On
                        </div>
                        <div className=" flex flex-row items-center gap-5 ">
                          <input
                            type="checkbox"
                            id="ESCHEMAMIGRATOR"
                            name="ESCHEMAMIGRATOR"
                            checked={editedSchemaMigrator}
                            onChange={(e) =>
                              setEditedSchemaMigrator(e.target.checked)
                            }
                            className="ml-3 h-5 w-5"
                          />
                          <label
                            htmlFor="ESCHEMAMIGRATOR"
                            className="text-sm font-medium"
                          >
                            Schema Migrator
                          </label>
                        </div>
                        <div className="mb-4 flex flex-row items-center gap-5">
                          <input
                            type="checkbox"
                            id="ESECURITYMANAGER"
                            name="ESECURITYMANAGER"
                            checked={editedSecurityManager}
                            onChange={(e) =>
                              setEditedSecurityManager(e.target.checked)
                            }
                            className="ml-3 h-5 w-5"
                          />
                          <label
                            htmlFor="SECURITYMANAGER"
                            className="text-sm font-medium "
                          >
                            Security Manager
                          </label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Save and Update
                      </button>
                    </form>
                  </label>
                </label>
              </div>
              <DeleteButton
                onDelete={() => {
                  deleteCredentialsItem(id, email).then(() =>
                    window.location.reload()
                  )
                }}
                editable={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credential
