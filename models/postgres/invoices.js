import conn from './db.js'

export class InvoiceModel {
  static async getAll (/* { _category } */) {
    try {
      /*    if (_category) {
        const loweCaseCategoryID = _category.toLowerCase()
        const res = await conn.query('SELECT * FROM invoice WHERE invoice_id_category = $1;', [loweCaseCategoryID])
        return res.rows
      }
      const result = await conn.query('SELECT * FROM invoice INNER JOIN category ON invoice.invoice_id_category = category.category_id INNER JOIN sub_category ON category.category_id_sub_category = sub_category.sub_category_id;') */
      const result = await conn.query('SELECT * FROM invoice;')
      console.log(result.rows)
      console.log('entro a Invoice Model')
      return result.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM invoice WHERE invoice_id = $1;', [id])
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
      const { total, method_payment, reference_payment, states_payment, states_date, id_orders } = input
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO invoice( invoice_total,invoice_method_payment,invoice_reference_payment,invoice_states_payment,invoice_states_date,invoice_id_orders ) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *;', [total, method_payment, reference_payment, states_payment, states_date, id_orders])
      return (resultID.rows)
    } catch (e) {
      console.log(e)
      throw new Error('Errro creating Invoice')
    }
  }

  static async update ({ idupdate, input }) {
    try {
      // eslint-disable-next-line camelcase
      const { id, name } = input
      // eslint-disable-next-line camelcase
      const result = await conn.query('UPDATE invoice SET invoice_total = $1,invoice_method_payment = $2 , invoice_reference_payment = $3, invoice_states_payment = $4 , invoice_states_date = $5 , invoice_id_orders = $6  WHERE invoice_id = $3 RETURNING *;', [id, name, idupdate])
      console.log(result.rows)
      return result.rows
    } catch (error) {
      return null
    }
  }

  static async delete ({ id }) {
    try {
      const result = await conn.query('DELETE FROM invoice WHERE invoice_id = $1 returning *;', [id])
      console.log(result.rows)
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error('Errro creating invoice')
    }
  }
}
