// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { snowflakeOrm } from 'src/config/db'

type Data = {}
async function getResetUrl(
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
      `alter user ${queryUsername} reset password`
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
  //handle get request
  if (req.method === 'GET') {
    const username = req.query.username
    const credentials = req.body.credentials

    const url = await getResetUrl(
      credentials.account,
      credentials.username,
      credentials.password,
      credentials.warehouse,
      credentials.role,
      username
    )

    res.status(200).json({ url: url?.[0]?.['status'] })
  }
}
