import pkg from 'pg'
import 'dotenv/config'

const { Pool } = pkg
let conn

// .ENV

/*
if (!conn) {
  conn = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  })
}
*/

if (!conn) {
  conn = new Pool({
    connectionString: process.env.DATABASE_URL
    // ssl: true
  })
}

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
    // const res = await conn.query('SELECT NOW()')
    const res = await conn.query('SELECT * FROM person;')
    console.log(res.rows)
    return res.rows
  }

  /*
  static async getById (id) {
    try {
      const result = await conn.query('SELECT id, title, year, director, duration, poster, rate FROM person WHERE id = $1;', [id])
      const [persons] = result.rows

      if (persons.length === 0) return null
      return persons
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    const { genre: genreInput, title, year, director, duration, poster } = input
    console.log(genreInput, title)

    const result = await conn.query('SELECT uuid_generate_v4() uuid;')

    const [{ uuid }] = result.rows
    console.log(uuid)

    try {
      const resultID = await conn.query('INSERT INTO person(id, title, year, director, duration, poster) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *;', [uuid, title, year, director, duration, poster])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating person')
    }
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM person WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }

  static async update ({ id, input }) {
    const { title, year, director, duration, poster, rate } = input

    const result = await conn.query('UPDATE person SET title = $1, year = $2, director = $3, duration = $4, poster = $5, rate = $6  WHERE id = $7 RETURNING *;', [title, year, director, duration, poster, rate, id])
    console.log(result.rows)
    return result.rows
  }
  */
}
