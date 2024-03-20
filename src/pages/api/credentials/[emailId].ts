import type { NextApiRequest, NextApiResponse } from 'next'

import {
  getCredentialsFromSF,
  saveCredentialsToSF,
  deleteCredentialsFromSF,
  updateCredentials,
} from 'src/lib/functions/snowflake-credentials'
// crud request for credentials

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let name = req.body.name
  let id = req.body.id
  let username = req.body.username
  let password = req.body.password
  let snowflakeURL = req.body.snowflakeURL
  let email = req.query.emailId
  let schemaMigrator = req.body.schemaMigrator
  let securityManager = req.body.securityManager

  //handle get request
  if (req.method === 'GET') {
    const resp = await getCredentialsFromSF(email)
    res.status(200).end(JSON.stringify(resp))
  }
  // handle post request
  else if (req.method === 'POST') {
    // handle sql injection
    name = name.replace(/'/g, `''`)
    username = username.replace(/'/g, `''`)
    snowflakeURL = snowflakeURL.replace(/'/g, `''`)
    name = name.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')
    username = username.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')
    snowflakeURL = snowflakeURL.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')

    await saveCredentialsToSF(
      name,
      email,
      password,
      snowflakeURL,
      username,
      schemaMigrator,
      securityManager
    )
    res.status(201).end()
  }
  // handle delete
  else if (req.method === 'DELETE') {
    await deleteCredentialsFromSF(id)
    res.status(200).end()
  }
  // handle put
  else if (req.method === 'PUT') {
    // handle sql injection
    name = name.replace(/'/g, `''`)
    username = username.replace(/'/g, `''`)
    snowflakeURL = snowflakeURL.replace(/'/g, `''`)
    name = name.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')
    username = username.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')
    snowflakeURL = snowflakeURL.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')

    await updateCredentials(
      id,
      name,
      email,
      snowflakeURL,
      username,
      password,
      schemaMigrator,
      securityManager
    )
    // update response code
    res.status(200).end()
  }
}
