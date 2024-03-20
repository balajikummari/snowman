// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteFormFromSF,
  getFormsFromSF,
  saveFormToSF,
  updateFormToSF,
} from 'src/lib/functions/snowflake-forms'
import { snowflakeOrm, dbConfig, form } from '../../../config/db'

type Data = {
  name: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const formId = req.query.formId

  //handle get request
  if (req.method === 'GET') {
    await getFormsFromSF(formId)
    res.status(200).end()
  }

  //handle post request
  else if (req.method === 'POST') {
    // TODO: prevent SQL Injection
    await saveFormToSF(formId, req.body.fingerprint, req.body)
    res.status(200).end()
  }

  // handle update
  else if (req.method === 'PUT') {
    req.body['FORMDATA'].name = req.body['FORMDATA'].name.replace(/'/g, `''`)
    req.body['FORMDATA'].estimationBy = req.body[
      'FORMDATA'
    ].estimationBy.replace(/'/g, `''`)
    req.body['FORMDATA'].estimationFor = req.body[
      'FORMDATA'
    ].estimationFor.replace(/'/g, `''`)
    req.body['FORMDATA'].name = req.body['FORMDATA'].name.replace(/"/g, `\\"`)
    req.body['FORMDATA'].estimationBy = req.body[
      'FORMDATA'
    ].estimationBy.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')
    req.body['FORMDATA'].estimationFor = req.body[
      'FORMDATA'
    ].estimationFor.replace(/[-[\]{}()*+?.,\\^$|#]"/g, '\\$&')
    await updateFormToSF(formId, req.body)
    res.status(200).end()
  }

  // handle delete
  else if (req.method === 'DELETE') {
    await deleteFormFromSF(formId)
    res.status(202).end()
  }
}
