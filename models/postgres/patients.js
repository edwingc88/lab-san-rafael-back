import conn from './db.js'
import bc from 'bcrypt'
export class PatientModel {
  static async getAll () {
    try {
      const res = await conn.query('SELECT * FROM patient;')
      // console.log(res.rows)
      return res.rows
    } catch (e) {
      throw new Error('ERRO')
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM patient WHERE id = $1;', [id])
      const [patients] = result.rows

      if (patients.length === 0) return null
      return patients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input

    const passwordHash = await bc.hash(password, 10)

    const result = await conn.query('SELECT uuid_generate_v4() uuid;')

    const [{ uuid }] = result.rows

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO patient( id,dni , password,firstname,lastname ,email ,birthdate,gender,address,mobilephone,homephone, blood_typing, created, picture_url,role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 , $13, $14 , $15  ) RETURNING *;', [uuid, dni, passwordHash, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating patient')
    }
  }

  static async update ({ id, input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input
    const passwordHash = await bc.hash(password, 10)
    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE patient SET dni = $1, password = $2 , firstname= $3 , lastname= $4, email= $5, birthdate=$6, gender=$7 , address=$8 , mobilephone=$9, homephone=$10, blood_typing=$11, created=$12 , picture_url=$13 , role_id=$14  WHERE id = $15 RETURNING *;', [dni, passwordHash, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id, id])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM patient WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
