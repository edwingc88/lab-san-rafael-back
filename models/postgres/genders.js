import conn from './db.js'
import bc from 'bcrypt'

export class GenderModel {
  static async getAll () {
    try {
      //  console.log(role)
      /*   if (role) {
        const loweCaseRole = role.toLowerCase()
        const result = await conn.query('SELECT id,name FROM role WHERE LOWER(name) = $1;', [loweCaseRole])
        const roles = result.rows

        if (roles.length === 0) {
          // console.log(roles.length)
          return []
        }
        const [{ id }] = roles

        const resultRoles = await conn.query('SELECT * FROM gender INNER JOIN role ON gender.gender_id_role = role.id WHERE role.id = $1;', [id])
        const genders = resultRoles.rows
        return genders
      } */
      const res = await conn.query('SELECT * FROM gender;')
      return res.rows
    } catch (e) {
      console.log('Error DB en consutar genders ')
      throw new Error(e)
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM gender WHERE gender_id = $1;', [id])
      return result.rows
    } catch (e) {
      console.log('Error DB en consutar ')
      throw new Error(e)
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { type } = input
    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO gender( gender_id,gender_dni , gender_password,gender_firstname,gender_lastname ,gender_email ,gender_address,gender_mobilephone,gender_created, gender_picture_url,gender_id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *;', [type])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating gender')
    }
  }

  static async update ({ id, input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input
    const passwordHash = await bc.hash(password, 10)
    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE gender SET dni = $1, password = $2 , firstname= $3 , lastname= $4, email= $5, birthdate=$6, gender=$7 , address=$8 , mobilephone=$9, homephone=$10, blood_typing=$11, created=$12 , picture_url=$13 , role_id=$14  WHERE id = $15 RETURNING *;', [dni, passwordHash, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id, id])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM gender WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
