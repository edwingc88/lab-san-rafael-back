import conn from './db.js'

export class PaymentModel {
  static async getAll (/* { _category } */) {
    try {
      /* if (_category) {
        const loweCaseCategoryID = _category.toLowerCase()
        const res = await conn.query('SELECT * FROM payment WHERE payment_id_category = $1;', [loweCaseCategoryID])
        return res.rows
      }
      const result = await conn.query('SELECT * FROM payment') */
      const result = await conn.query('SELECT * FROM payment INNER JOIN orders ON payment.payment_id_orders = orders.orders_id INNER JOIN order_status ON orders.orders_id_order_status = order_status.order_status_id;')
      console.log(result.rows)
      console.log('entro a Payment Model')
      return result.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM payment WHERE payment_id = $1;', [id])
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    try {
    // eslint-disable-next-line camelcase
      const { bs, dolar, reference, status, id_orders } = input
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO payment( payment_bs,payment_dolar,payment_reference,payment_status,payment_id_orders ) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *;', [bs, dolar, reference, status, id_orders])
      return (resultID.rows)
    } catch (e) {
      console.log(e)
      throw new Error('Errro creating Payment')
    }
  }

  static async update ({ idupdate, input }) {
    try {
      // eslint-disable-next-line camelcase
      const { total, method_payment, reference_payment, states_payment, states_date, id_orders } = input
      // eslint-disable-next-line camelcase
      const result = await conn.query('UPDATE payment SET payment_total = $1,payment_method_payment = $2 , payment_reference_payment = $3, payment_states_payment = $4 , payment_states_date = $5 , payment_id_orders = $6  WHERE payment_id = $7 RETURNING *;', [total, method_payment, reference_payment, states_payment, states_date, id_orders, idupdate])
      console.log(result.rows)
      return result.rows
    } catch (error) {
      return null
    }
  }

  static async delete ({ id }) {
    try {
      const result = await conn.query('DELETE FROM payment WHERE payment_id = $1 returning *;', [id])
      console.log(result.rows)
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error('Errro creating payment')
    }
  }
}
