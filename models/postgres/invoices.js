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
      const result = await conn.query('SELECT * FROM invoice WHERE id_invoice = $1;', [id])
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
      const resultID = await conn.query('INSERT INTO invoice( name ,id_category ) VALUES ($1, $2 ) RETURNING *;', [name, id_category])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE invoice SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM invoice WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
