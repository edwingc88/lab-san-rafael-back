import conn from './db.js'
export class OrderModel {
  static async getAll (user) {
    try {
      console.log('Entro en Model ', user)
      if (user) {
        const loweCaseUserID = user.toLowerCase()
        const res = await conn.query('SELECT * FROM orders WHERE orders_id_users = $1;', [loweCaseUserID])
        //  const res = await conn.query('SELECT * FROM orders JOIN users ON users.users_id = orders.orders_id_users ;')

        return res.rows
      }
      // const result = await conn.query('SELECT * FROM orders INNER JOIN exam ON exam.exam_id = orders.orders_id_exam ;')
      /*       const result = await conn.query('SELECT * FROM orders;') */
      const result = await conn.query('SELECT * FROM orders JOIN users ON users.users_id = orders.orders_id_users  JOIN states ON states.states_id = orders.orders_id_states ;')
      console.log(result.rows)
      console.log('entro a order Model')
      return result.rows
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM orders WHERE id_orders = $1;', [id])
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { name, id_category } = input

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO orders( name ,id_category ) VALUES ($1, $2 ) RETURNING *;', [name, id_category])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE orders SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM orders WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
