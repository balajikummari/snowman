import type { NextApiRequest, NextApiResponse } from 'next'

import {
  validateUser,
  saveUserToSF,
  getUserFromSF,
} from 'src/lib/functions/snowflake-users'
type Data = {}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    // req.body = req.body.data
    let userEmail = req.query.userEmail as string
    userEmail = userEmail.replace(/'/g, `''`)
    userEmail = userEmail.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')
    console.log(userEmail)
    const resp = await getUserFromSF(userEmail)
    // console.log(resp)
    if (resp === null) res.status(204).end('User not found')
    else {
      res.status(200).end(JSON.stringify(resp))
    }
  }
}
