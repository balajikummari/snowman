import { dbConfig, user, snowflakeOrm } from 'src/config/db'

import { hash, compare } from 'bcryptjs'

export async function validateUser(email: string, password: string) {
  await snowflakeOrm.connect(dbConfig)
  const matchedUser = await user.find({
    where: {
      condition: {
        email: email,
      },
    },
  })
  const isValid = await compare(password, matchedUser[0]?.['PASSWORD'])
  return isValid ? matchedUser[0] : null
}

export async function getUserFromSF(email: string) {
  await snowflakeOrm.connect(dbConfig)
  const matchedUser = await user.find({
    where: {
      condition: {
        email: email,
      },
    },
  })
  return matchedUser[0]?.['EMAIL'] ? matchedUser[0]['EMAIL'] : null
}

export async function saveUserToSF(email: string, password: string) {
  await snowflakeOrm.connect(dbConfig)
  await user.save({
    email: email,
    password: await hash(password, 10),
  })
}

export async function changeUserPasswordInSF(
  email: string,
  password: string,
  newPassword: string
) {
  await snowflakeOrm.connect(dbConfig)
  await user.update(
    {
      email: email,
      password: await hash(newPassword, 10),
    },
    {
      where: {
        condition: {
          email: email,
        },
      },
    }
  )
}
