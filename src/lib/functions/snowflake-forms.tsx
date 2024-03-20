import { dbConfig, form, snowflakeOrm } from 'src/config/db'

export async function getFormsFromSF(formId: any) {
  await snowflakeOrm.connect(dbConfig)
  const matchedForm = await form.find({
    where: {
      condition: {
        formId: formId,
      },
    },
  })
  return matchedForm
}
//delete form
export async function deleteFormFromSF(formId: any) {
  await snowflakeOrm.connect(dbConfig)
  await form.delete({
    where: {
      condition: {
        formId: formId,
      },
    },
  })
}

export async function saveFormToSF(formId: any, fingerprint: any, body: any) {
  await snowflakeOrm.connect(dbConfig)
  await form.save({
    formId: formId,
    fingerprint: fingerprint,
    formData: body,
  })
}

export async function updateFormToSF(formId: any, body: any) {
  await snowflakeOrm.connect(dbConfig)
  await form.update(body, {
    where: {
      condition: {
        formId: formId,
      },
    },
  })
}
