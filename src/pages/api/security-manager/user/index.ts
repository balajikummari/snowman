// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { snowflakeOrm } from 'src/config/db'

import { getCredentialById } from 'src/lib/functions/snowflake-credentials'
const crypto = require('crypto')

const hash256 = (text: string) => {
  return crypto.createHash('sha256').update(text).digest('hex')
}
const algorithm = 'aes-256-cbc'
const decrypt = (text: string, key: string) => {
  const [iv, encryptedText] = text
    .split(':')
    .map((part) => Buffer.from(part, 'hex'))
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, 'hex'),
    iv
  )
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
type Data = {}
async function getAllUsers(
  account: any,
  username: any,
  password: any,
  warehouse: any,
  role: any
) {
  const newConfig = {
    account: account,
    username: username,
    password: password,
    warehouse: warehouse,
    role: role,
    application: 'snowman-security-manager',
  }
  try {
    await snowflakeOrm.connect(newConfig)
    const users = await snowflakeOrm.query(`SHOW USERS`)
    return users
  } catch (err) {
    console.log(err)
    return null
  }
}

async function createUser(
  newConfig: any,
  queryUsername: any,
  queryPassword: any,
  queryDisplay_name: any,
  queryEmail: any,
  queryFirst_name: any,
  queryLast_name: any,
  queryDefault_role: any,
  queryDefault_warehouse: any,
  queryMustChangePassword: any,
  quertComment: any
) {
  try {
    //get random password
    // const generatedPassword = Math.random().toString(36).slice(-8)
    await snowflakeOrm.connect(newConfig)
    const query = `create user ${queryUsername} password = '${queryPassword}' default_role = ${queryDefault_role} first_name = '${queryFirst_name}' last_name = '${queryLast_name}' display_name = '${queryDisplay_name}' email = '${queryEmail}' default_warehouse = '${queryDefault_warehouse}'  must_change_password = ${queryMustChangePassword} comment='${quertComment}'`
    console.log(query)
    const user = await snowflakeOrm.query(query)
    return user
  } catch (err) {
    console.log(err)
    return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //handle get request
  if (req.method === 'GET') {
    const credentialsId = req.body.credentialsId

    //get next auth session
    const session = await getSession()
    if (!session) {
      res.status(401).json({ message: 'Please login' })
      return
    }
    console.log(session.user?.email)

    const credentials = await snowflakeOrm.findOne('credentials', {
      id: credentialsId,
    })
    const users = await getAllUsers(
      credentials.account,
      credentials.username,
      credentials.password,
      credentials.warehouse,
      credentials.role
    )
    res.status(200).json({ users })
  }
  //create user on POST request
  if (req.method === 'POST') {
    const data = req.body.data
    const credentialsId = data.credentialsId
    const username = data.username
    const password = data.password
    const display_name = data.display_name
    const session = data.session
    const email = session.user.email
    const first_name = data.first_name
    const last_name = data.last_name
    const default_role = data.default_role
    const default_warehouse = data.default_warehouse
    const must_change_password = data.must_change_password
    const comment = data.comment
    try {
      const credentials = await getCredentialById(credentialsId)

      if (!credentials) {
        return null
      }

      if (!email) {
        return null
      }

      const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(email))

      let url = credentials[0].SNOWFLAKEURL
      if (url[url.length - 1] == '/') {
        url = url.slice(0, url.length - 1)
      }
      const urlSplit = url.split('/')
      const name = urlSplit[urlSplit.length - 1]
      const ACCOUNT = name.replace('.snowflakecomputing.com', '')

      const newConfig = {
        account: ACCOUNT,
        username: credentials[0].USERNAME,
        password: decryptedPassword,
        application: 'snowman-security-manager',
      }
      const users = await createUser(
        newConfig,
        username,
        password,
        display_name,
        email,
        first_name,
        last_name,
        default_role,
        default_warehouse,
        must_change_password,
        comment
      )

      const grantRole = await snowflakeOrm.query(
        `GRANT ROLE ${default_role} TO USER ${username}`
      )
      res.status(201).json({ users })
    } catch (err) {
      console.log(err)

      return res.status(500).json({ error: err })
    }
  }
}
