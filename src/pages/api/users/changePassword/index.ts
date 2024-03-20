import type { NextApiRequest, NextApiResponse } from 'next'

import {
  validateUser,
  changeUserPasswordInSF,
} from 'src/lib/functions/snowflake-users'
type Data = {}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'PUT') {
    console.log(req.body)
    let userEmail = req.body.data.userEmail
    let userPassword = req.body.data.userPassword
    let newPassword = req.body.data.newPassword
    userEmail = userEmail.replace(/'/g, `''`)
    userEmail = userEmail.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')
    const user = await validateUser(userEmail, userPassword)
    console.log(user)
    if (user) {
      await changeUserPasswordInSF(userEmail, userPassword, newPassword)
      res.status(200).end('Password changed successfully')
    } else {
      res.status(400).end('Wrong Password')
    }
  }
}
