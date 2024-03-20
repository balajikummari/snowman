import React from 'react'
import axios from 'axios'
import CredentialsList from './CredentialsList'

interface CredentialManagerProps {
  credentialsList: any
  email: any
}

const CredentialManager = ({
  credentialsList,
  email,
}: CredentialManagerProps) => {
  const [connectionSatus, setConnectionStatus] = React.useState('')
  return (
    <div className="flex flex-col gap-8">
      {/* Title of page on top left */}
      <div className="flex flex-col ">
        <h1 className="text-xl font-bold text-primary">
          Snowflake Credentials
        </h1>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg font-semibold">Registered Credentials</div>

        <label
          htmlFor="my-modal-5"
          className="modal-button btn btn-outline btn-secondary "
        >
          Add New Credentials
        </label>
      </div>
      <CredentialsList credentialsList={credentialsList} email={email} />

      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <label htmlFor="my-modal-5" className="modal cursor-pointer">
        <label className="modal-box relative rounded-lg" htmlFor="">
          <h3 className="mb-6 text-base font-bold text-primary">
            Enter your Snowflake Credentials
          </h3>
          <form
            className="flex flex-col"
            onSubmit={async (e) => {
              e.preventDefault()
              const {
                NAME,
                SNOWFLAKEURL,
                USERNAME,
                PASSWORD,
                SCHEMAMIGRATOR,
                SECURITYMANAGER,
              } = e.currentTarget
              const emailId = email
              const response = await axios.post(`/api/credentials/${emailId}`, {
                name: NAME.value,
                snowflakeURL: SNOWFLAKEURL.value,
                username: USERNAME.value,
                password: PASSWORD.value,
                emailId: emailId,
                schemaMigrator: SCHEMAMIGRATOR.checked,
                securityManager: SECURITYMANAGER.checked,
              })
              if (response.status === 201) {
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
                  htmlFor="SNOWFLAKEURL"
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
                  id="SNOWFLAKEURL"
                  name="SNOWFLAKEURL"
                  placeholder='eg: "https://md57071.ap-south-1.aws.snowflakecomputing.com"'
                  className="input input-sm w-full max-w-xs  items-end justify-end rounded-sm outline outline-2 outline-light-grey focus:outline-secondary"
                  required
                />
              </div>
              <div className="flex flex-row  items-center justify-between">
                <label
                  htmlFor="USERNAME"
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
                  id="USERNAME"
                  name="USERNAME"
                  placeholder="Snowflake Username"
                  className="input input-sm w-full max-w-xs items-end justify-end rounded-sm outline outline-2 outline-light-grey focus:outline-secondary"
                  required
                />
              </div>
              <div className="flex flex-row items-center justify-between">
                <label
                  htmlFor="PASSWORD"
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
                  id="PASSWORD"
                  name="PASSWORD"
                  placeholder="Password"
                  className="input input-sm w-full max-w-xs items-end justify-end rounded-sm outline outline-2 outline-light-grey focus:outline-secondary"
                  required
                />
              </div>
              <div className="flex flex-row items-center justify-between">
                <label
                  htmlFor="NAME"
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
                  id="NAME"
                  name="NAME"
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
                  id="SCHEMAMIGRATOR"
                  name="SCHEMAMIGRATOR"
                  className="ml-3 h-5 w-5"
                />
                <label htmlFor="SCHEMAMIGRATOR" className="text-sm font-medium">
                  Schema Migrator
                </label>
              </div>
              <div className="mb-4 flex flex-row items-center gap-5">
                <input
                  type="checkbox"
                  id="SECURITYMANAGER"
                  name="SECURITYMANAGER"
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
            <div
              className={`alert alert-success rounded shadow-lg ${
                connectionSatus === 'success' ? '' : 'hidden'
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
                <span>Connection Looks Good 👍</span>
              </div>
            </div>
            <div
              className={`alert alert-error rounded shadow-lg ${
                connectionSatus === 'faliure' ? '' : 'hidden'
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
                <span>Connection Failed 😱</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                style={{ textTransform: 'none' }}
                className="btn btn-outline btn-primary flex w-auto flex-row flex-wrap overflow-hidden border p-2 text-base font-semibold"
                onClick={async (e) => {
                  // test the connection using form data
                  const { SNOWFLAKEURL, USERNAME, PASSWORD }: any =
                    e.currentTarget.form

                  //split the url and get the name

                  let url = SNOWFLAKEURL.value
                  if (url[url.length - 1] == '/') {
                    url = url.slice(0, url.length - 1)
                  }
                  const urlSplit = url.split('/')
                  const name = urlSplit[urlSplit.length - 1]
                  const ACCOUNT = name.split('.')[0] + '.' + name.split('.')[1]

                  try {
                    const response = await axios.post(
                      '/api/security-manager/test-connection',
                      {
                        account: ACCOUNT,
                        username: USERNAME.value,
                        password: PASSWORD.value,
                      }
                    )
                    setConnectionStatus('success')
                    console.log(connectionSatus)
                    setTimeout(() => {
                      setConnectionStatus('')
                      console.log(connectionSatus)
                    }, 2000)
                  } catch (err) {
                    setConnectionStatus('failure')
                    setTimeout(() => {
                      setConnectionStatus('')
                    }, 2000)
                  }
                }}
              >
                Test Connection
              </button>
              <button
                type="submit"
                style={{
                  textTransform: 'none',
                  color: '#fff',
                  position: 'relative',
                }}
                className="btn btn-primary text-base font-semibold "
              >
                Submit
              </button>
            </div>
          </form>
          {/* <p className="py-4">
                        <span className="text-sm">
                          <a
                            href="
                            https://docs.snowflake.net/manuals/user-guide/connecting-to-snowflake.html"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Learn more about connecting to Snowflake
                          </a>
                        </span>
                      </p> */}
        </label>
      </label>
    </div>
  )
}

export default CredentialManager
