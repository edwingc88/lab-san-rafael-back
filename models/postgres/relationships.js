import conn from './db.js'

export class RelationshipModel {
  static async getAll () {
    try {
      const res = await conn.query('SELECT * FROM relationship;')
      // console.log(res.rows)
      return res.rows
    } catch (e) {
      throw new Error('ERRO')
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM relationship WHERE id = $1;', [id])
      const [relationships] = result.rows

      if (relationships.length === 0) return null
      return relationships
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { type } = input
    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO relationship( relationship_id,relationship_dni , relationship_password,relationship_firstname,relationship_lastname ,relationship_email ,relationship_address,relationship_mobilephone,relationship_created, relationship_picture_url,relationship_id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *;', [type])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating relationship')
    }
  }

  static async update ({ id, input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input
    // const passwordHash = await bc.hash(password, 10)
    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE relationship SET dni = $1, password = $2 , firstname= $3 , lastname= $4, email= $5, birthdate=$6, gender=$7 , address=$8 , mobilephone=$9, homephone=$10, blood_typing=$11, created=$12 , picture_url=$13 , role_id=$14  WHERE id = $15 RETURNING *;', [dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id, id])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM relationship WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
