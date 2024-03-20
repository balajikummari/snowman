// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { testConnection } from '../../../lib/functions/snowflake-credentials'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { account, username, password } = req.body
    const result = await testConnection(account, username, password)
    return result
      ? res.status(200).send({ name: 'success' })
      : res.status(404).send({ name: 'fail' })
  }
}
