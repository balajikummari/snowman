// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
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

async function getRoles(
  account: any,
  username: any,
  password: any,
  warehouse: any,
  role: any,
  queryUsername: any
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
    const user = await snowflakeOrm.query(
      `SHOW GRANTS TO USER ${queryUsername}`
    )
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
  if (req.method === 'GET') {
    const username = req.query.username
    const credentials = req.body.credentials
    const resp = await getRoles(
      credentials.account,
      credentials.username,
      credentials.password,
      credentials.warehouse,
      credentials.role,
      username
    )
    res.status(200).json(resp)
  }

  if (req.method === 'POST') {
    req.body = req.body.data
    const role = req.body.role
    const username = req.query.username
    const credentialsId = req.body.credentialsId
    const session = req.body.session
    const email = session.user.email
    const credentials = await getCredentialById(credentialsId)
    if (!credentials) {
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
    try {
      await snowflakeOrm.connect(newConfig)
      const user = await snowflakeOrm.query(
        `GRANT ROLE ${role} TO USER ${username}`
      )
      return res.status(200).json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err })
    }
  }
  if (req.method === 'DELETE') {
    const role = req.body.role
    const username = req.query.username
    const credentialsId = req.body.credentialsId
    const session = req.body.session
    const email = session.user.email
    const credentials = await getCredentialById(credentialsId)
    if (!credentials) {
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
    try {
      await snowflakeOrm.connect(newConfig)
      const user = await snowflakeOrm.query(
        `REVOKE ROLE ${role} FROM USER ${username}`
      )
      return res.status(200).json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err })
    }
  }
}
