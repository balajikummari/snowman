import { dbConfig, credentials, snowflakeOrm } from 'src/config/db'

import uniqid from 'uniqid'
const crypto = require('crypto')

// sha 256 hash
const hash256 = (text: string) => {
  return crypto.createHash('sha256').update(text).digest('hex')
}

const algorithm = 'aes-256-cbc'
// generate key with crypto.randomBytes(256/8).toString('hex')

const IV_LENGTH = 16

const encrypt = (text: string, key: string) => {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

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

export async function getCredentialsFromSF(email: any) {
  await snowflakeOrm.connect(dbConfig)
  const matchedCredentials = await credentials.find({
    where: {
      condition: {
        email: email,
      },
    },
  })
  return matchedCredentials ? matchedCredentials : null
}

export async function saveCredentialsToSF(
  name: any,
  email: any,
  password: any,
  snowflakeURL: any,
  username: any,
  schemaMigrator: any,
  securityManager: any
) {
  await snowflakeOrm.connect(dbConfig)

  const key = hash256(email)
  const encrypted = encrypt(password, key)
  const id = uniqid()
  await credentials.save({
    id: id,
    name: name,
    email: email,
    password: encrypted,
    snowflakeURL: snowflakeURL,
    username: username,
    schemaMigrator: schemaMigrator,
    securityManager: securityManager,
  })
}

export async function getCredentialByUsernameFromSF(email: any, username: any) {
  await snowflakeOrm.connect(dbConfig)
  const matchedCredentials = await credentials.find({
    where: {
      condition: {
        email: email,
        username: username,
      },
    },
  })
  return matchedCredentials ? matchedCredentials : null
}

export async function getCredentialById(id: any) {
  await snowflakeOrm.connect(dbConfig)
  const matchedCredentials = await credentials.find({
    where: {
      condition: {
        id: id,
      },
    },
  })
  return matchedCredentials ? matchedCredentials : null
}
// update credentials
export async function updateCredentials(
  id: any,
  name: any,
  email: any,
  snowflakeURL: any,
  username: any,
  password: any,
  schemaMigrator: any,
  securityManager: any
) {
  await snowflakeOrm.connect(dbConfig)
  const key = hash256(email)
  const encrypted = encrypt(password, key)
  await credentials.update(
    {
      id: id,
      name: name,
      snowflakeURL: snowflakeURL,
      username: username,
      password: encrypted,
      schemaMigrator: schemaMigrator,
      securityManager: securityManager,
    },
    {
      where: {
        condition: {
          id: id,
          email: email,
        },
      },
    }
  )
}

export async function deleteCredentialsFromSF(id: any) {
  await snowflakeOrm.connect(dbConfig)
  await credentials.delete({
    where: {
      condition: {
        id: id,
      },
    },
  })
}

export async function testConnection(
  account: any,
  username: any,
  password: any
) {
  const newConfig = {
    account: account,
    username: username,
    password: password,
    application: 'snowman-security-manager',
  }
  try {
    await snowflakeOrm.connect(newConfig)
    return true
  } catch (err) {
    return false
  }
}
