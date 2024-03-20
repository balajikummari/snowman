// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
const { snowflakeOrm, dbConfig, form } = require('src/config/db')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const fpId = req.query.fpId
  //handle get request
  if (req.method === 'GET') {
    await snowflakeOrm.connect(dbConfig)
    const forms = await form.find({
      where: {
        condition: {
          fingerprint: fpId,
        },
      },
    })
    return res.status(200).send(forms)
  }
  return res.status(404)
}
