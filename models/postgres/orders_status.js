import conn from './db.js'
// import bc from 'bcrypt'

export class OrderStatuModel {
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

        const resultRoles = await conn.query('SELECT * FROM states INNER JOIN role ON states.states_id_role = role.id WHERE role.id = $1;', [id])
        const statess = resultRoles.rows
        return statess
      } */
      const res = await conn.query('SELECT * FROM order_status;')
      return res.rows
    } catch (e) {
      console.log('Error DB en consutar order_status ')
      throw new Error(e)
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM order_status WHERE order_status_id = $1;', [id])
      return result.rows
    } catch (e) {
      console.log('Error DB en order_status by ID  ')
      throw new Error(e)
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { name, description } = input
    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO order_status(order_status_name,order_status_description) VALUES ($1, $2) RETURNING *;', [name, description])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating order_status')
    }
  }

  static async update ({ id, input }) {
    try {
      // eslint-disable-next-line camelcase
      const { name, description } = input
      // const passwordHash = await bc.hash(password, 10)
      // eslint-disable-next-line camelcase
      const result = await conn.query('UPDATE order_status SET order_status_name = $1, order_status_description = $2  WHERE order_status_id = $3 RETURNING *;', [name, description, id])
      console.log(result.rows)
      return result.rows
    } catch (error) {
      throw new Error('Errro creating order_status')
    }
  }

  static async delete ({ id }) {
    try {
      console.log(id)
      const result = await conn.query('DELETE FROM order_status WHERE order_status_id = $1 returning *;', [id])
      console.log(result.rows)
      return result.rows
    } catch (e) {
      console.log('Error order_status DB in request by ID  ')
      throw new Error(e)
    }
  }
}
