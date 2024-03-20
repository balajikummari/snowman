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
    const user = await snowflakeOrm.query(`SHOW ROLES`)
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
    const credentials = req.body.credentials
    const resp = await getRoles(
      credentials.account,
      credentials.username,
      credentials.password,
      credentials.warehouse,
      credentials.role
    )
    res.status(200).json(resp?.[0])
  }
  if (req.method === 'POST') {
    req.body = req.body.data
    let role = req.body.rolename
    role = role.replace(/'/g, `''`)
    role = role.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')
    let comment = req.body.comment
    comment = comment.replace(/'/g, `''`)
    comment = comment.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')

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
      const newrole = await snowflakeOrm.query(
        `create role ${role} comment = '${comment}'`
      )
      return res.status(200).json(newrole)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err })
    }
  }
  if (req.method === 'DELETE') {
    let role = req.body.rolename
    role = role.replace(/'/g, `''`)
    role = role.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')

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
      const drop = await snowflakeOrm.query(`drop role ${role}`)
      return res.status(200).json(drop)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err })
    }
  }
}
