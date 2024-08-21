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
      const result = await conn.query('SELECT * FROM category WHERE category_id = $1;', [id])
      /*       const [clients] = result.rows
      if (clients.length === 0) return null */
      return result.rows
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    try {
      // eslint-disable-next-line camelcase
      const { name } = input
      console.log(name)

      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO category(category_name) VALUES ($1) RETURNING *;', [name])
      return (resultID.rows)
    } catch (e) {
      return e
    }
  }

  static async update ({ id, input }) {
    try {
      // eslint-disable-next-line camelcase
      const { name } = input

      // eslint-disable-next-line camelcase
      const result = await conn.query('UPDATE category SET category_name = $1  WHERE category_id = $2 RETURNING *;', [name, id])
      console.log(result.rows)
      return result.rows
    } catch (error) {
      console.log(error)
      return null
    }
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
