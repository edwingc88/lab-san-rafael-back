import pkg from 'pg'
import 'dotenv/config'

const { NODE_ENV } = process.env

const { Pool } = pkg
let conn
if (!conn) {
  if (NODE_ENV === 'development ') {
    conn = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
    })
  } else {
    conn = new Pool({
      connectionString: process.env.DATABASE_URL
      // ssl: true
    })
  }
}

export default conn
