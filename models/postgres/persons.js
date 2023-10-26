import pkg from 'pg'
import 'dotenv/config'

const { Pool } = pkg
let conn

// .ENV

if (!conn) {
  conn = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  })
}

/*
if (!conn) {
  conn = new Pool({
    connectionString: process.env.DATABASE_URL
    // ssl: true
  })
}
*/

export class PersonModel {
  static async getAll ({ role }) {
    if (role) {
      console.log(role)
      const loweCaseRole = role.toLowerCase()
      console.log(loweCaseRole)
      const result = await conn.query('SELECT id,name FROM role WHERE LOWER(name) = $1;', [loweCaseRole])
      const roles = result.rows

      if (roles.length === 0) {
        console.log(roles.length)
        return []
      }
      const [{ id }] = roles

      const resultRoles = await conn.query('SELECT * FROM person INNER JOIN role ON person.role_id = role.id WHERE role.id = $1;', [id])
      const persons = resultRoles.rows
      return persons
    }
    const res = await conn.query('SELECT * FROM person;')
    console.log(res.rows)
    return res.rows
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM person WHERE id = $1;', [id])
      const [persons] = result.rows

      if (persons.length === 0) return null
      return persons
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input

    const result = await conn.query('SELECT uuid_generate_v4() uuid;')

    const [{ uuid }] = result.rows
    console.log(uuid)

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO person( id,dni , password,firstname,lastname ,email ,birthdate,gender,address,mobilephone,homephone, blood_typing, created, picture_url,role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 , $13, $14 , $15  ) RETURNING *;', [uuid, dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating person')
    }
  }

  static async update ({ id, input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE person SET dni = $1, password = $2 , firstname= $3 , lastname= $4, email= $5, birthdate=$6, gender=$7 , address=$8 , mobilephone=$9, homephone=$10, blood_typing=$11, created=$12 , picture_url=$13 , role_id=$14  WHERE id = $15 RETURNING *;', [dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id, id])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM person WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
