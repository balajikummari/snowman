import { getSession } from 'next-auth/react'
import { snowflakeOrm } from 'src/config/db'
import { getCredentialById } from './snowflake-credentials'

const crypto = require('crypto')
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
// sha 256 hash
const hash256 = (text: string) => {
  return crypto.createHash('sha256').update(text).digest('hex')
}

export async function getAllUsers(credentialsId: string, key: string) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const users = await snowflakeOrm.query(`SHOW USERS`)
    return users
  } catch (err) {
    console.log(err)
    return null
  }
}
export async function getAll(credentialsId: string, key: string) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const users = await snowflakeOrm.query(`SHOW USERS`)
    const warehouses = await snowflakeOrm.query(`SHOW WAREHOUSES`)
    const roles = await snowflakeOrm.query(`SHOW ROLES`)
    const resourceMonitors = await snowflakeOrm.query(`SHOW RESOURCE MONITORS`)
    const integrations = await snowflakeOrm.query(`SHOW INTEGRATIONS`)
    const databases = await snowflakeOrm.query(`SHOW DATABASES`)
    let schemas: any = {}
    for (let db in databases) {
      const dbName = databases[db].name
      let schemasInCurrentDb = await snowflakeOrm.query(
        `SHOW SCHEMAS IN ${dbName}`
      )
      schemas[dbName] = schemasInCurrentDb
    }
    console.log(schemas)

    return {
      users: users,
      warehouses: warehouses,
      schemas: schemas,
      roles: roles,
      resourceMonitors: resourceMonitors,
      integrations: integrations,
      databases: databases,
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getAllWarehouses(credentialsId: string, key: string) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const users = await snowflakeOrm.query(`SHOW WAREHOUSES`)
    return users
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getAllSchemas(credentialsId: string, key: string) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const users = await snowflakeOrm.query(`SHOW SCHEMAS`)
    return users
  } catch (err) {
    console.log(err)
    return null
  }
}
export async function getAllIntegrations(credentialsId: string, key: string) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const users = await snowflakeOrm.query(`SHOW INTEGRATIONS`)
    return users
  } catch (err) {
    console.log(err)
    return null
  }
}
export async function getAllResourceMonitors(
  credentialsId: string,
  key: string
) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const users = await snowflakeOrm.query(`SHOW RESOURCE MONITORS`)
    return users
  } catch (err) {
    console.log(err)
    return null
  }
}
export async function getAllDatabases(credentialsId: string, key: string) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const users = await snowflakeOrm.query(`SHOW DATABASES`)
    return users
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getAllRoles(credentialsId: string, key: string) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const users = await snowflakeOrm.query(`SHOW ROLES`)
    return users
  } catch (err) {
    console.log(err)
    return null
  }
}
export async function getUser(
  credentialsId: string,
  key: string,
  username: string
) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const user = await snowflakeOrm.query(`DESC USER ${username}`)
    return user
  } catch (err) {
    console.log(err)
    return null
  }
}
export async function getGrants(
  credentialsId: string,
  key: string,
  username: string
) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const user = await snowflakeOrm.query(`SHOW GRANTS TO USER ${username}`)
    return user
  } catch (err) {
    console.log(err)
    return null
  }
}
export async function getGrantsToRole(
  credentialsId: string,
  key: string,
  rolename: string
) {
  const credentials = await getCredentialById(credentialsId)
  if (!credentials) {
    return null
  }

  if (!key) {
    return null
  }

  const decryptedPassword = decrypt(credentials[0].PASSWORD, hash256(key))

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
    const user = await snowflakeOrm.query(`SHOW GRANTS TO ROLE ${rolename}`)
    return user
  } catch (err) {
    console.log(err)
    return null
  }
}
