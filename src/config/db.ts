export const snowflakeOrm = require('src/lib/snowflake-orm')

export const dbConfig = {
  warehouse: process.env.SF_WAREHOUSE,
  database: process.env.SF_DATABASE,
  schema: process.env.SF_SCHEMA,
  role: process.env.SF_ROLE,
  account: process.env.SF_ACCOUNT,
  username: process.env.SF_USER,
  password: process.env.SF_PASSWORD,
  application: process.env.SF_APPLICATION,
}

const Init = snowflakeOrm.Init

export const form = new Init(process.env.SF_TABLE, {
  formId: {
    type: snowflakeOrm.VARCHAR(50),
    require: true,
    unique: true,
  },
  fingerprint: {
    type: snowflakeOrm.VARCHAR(50),
    require: true,
  },
  formData: {
    type: 'OBJECT',
  },
})

export const user = new Init('users', {
  email: {
    type: snowflakeOrm.VARCHAR(255),
    require: true,
    unique: true,
  },
  password: {
    type: snowflakeOrm.VARCHAR(255),
    require: true,
  },
})

export const credentials = new Init('credentials', {
  email: {
    type: snowflakeOrm.VARCHAR(255),
    require: true,
  },
  snowflakeURL: {
    type: snowflakeOrm.VARCHAR(255),
    require: true,
  },
  username: {
    type: snowflakeOrm.VARCHAR(255),
    require: true,
  },
  password: {
    type: snowflakeOrm.VARCHAR(255),
    require: true,
  },
  role: {
    type: snowflakeOrm.VARCHAR(255),
    require: true,
  },
  warehouse: {
    type: snowflakeOrm.VARCHAR(255),
    require: true,
  },
})
