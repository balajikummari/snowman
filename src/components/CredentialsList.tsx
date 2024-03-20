import axios from 'axios'
import { getSession } from 'next-auth/react'
import React, { MouseEventHandler } from 'react'
import { credentials } from 'src/config/db'
import { getCredentialsFromSF } from 'src/lib/functions/snowflake-credentials'
import Credential from './cards/Credential'
import { DeleteButton } from './DeleteButton'

interface CredentialsListProps {
  credentialsList: any
  email: any
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

const CredentialsList = ({ credentialsList, email }: CredentialsListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {credentialsList.map((credentials: any) => (
        <Credential
          key={credentials.id}
          email={email}
          id={credentials['ID']}
          name={credentials['NAME']}
          snowflakeURL={credentials['SNOWFLAKEURL']}
          username={credentials['USERNAME']}
          password={''}
          schemaMigrator={credentials['SCHEMAMIGRATOR']}
          securityManager={credentials['SECURITYMANAGER']}
        />
      ))}
    </div>
  )
}

export default CredentialsList
