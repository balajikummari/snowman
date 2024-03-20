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
  if (req.method === 'POST') {
    console.log(req.body)
    let userEmail = req.body.data.userEmail
    let userPassword = req.body.data.userPassword
    userEmail = userEmail.replace(/'/g, `''`)
    userEmail = userEmail.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(userPassword)) {
      res.status(400).end('Weak Password')
    }
    await saveUserToSF(userEmail, userPassword)
    res.status(201).end()
  }
}
