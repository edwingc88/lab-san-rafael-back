import conn from './db.js'
export class CategoryModel {
  static async getAll () {
    try {
      const res = await conn.query('SELECT * FROM category;')
      console.log(res.rows)
      return res.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM category WHERE id = $1;', [id])
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO category( id,name ) VALUES ($1, $2 ) RETURNING *;', [id, name])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE category SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    try {
      const result = await conn.query('DELETE FROM category WHERE category_id = $1 returning *;', [id])
      console.log(result.rows)
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error('Errro Deleting Category')
    }
  }
}
