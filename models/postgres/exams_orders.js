import conn from './db.js'
// import bc from 'bcrypt'
export class ExamOrderResultModel {
/*   static async getAll ({ _category }) {
    try {
      if (_category) {
        const loweCaseCategoryID = _category.toLowerCase()
        const res = await conn.query('SELECT * FROM exam_orders_result JOIN exam_orders_result_category ON exam_orders_result.exam_orders_result_id = exam_orders_result_category.ec_id_exam_orders_result  WHERE exam_orders_result_category.ec_id_category=$1;', [loweCaseCategoryID])
        return res.rows
      }
      //  const result = await conn.query('SELECT * FROM exam_orders_result JOIN exam ON exam.exam_id = exam_orders_result.exam_orders_result_id_exam JOIN category ON category.category_id = exam_orders_result.exam_orders_result_id_category;')
      const result = await conn.query('SELECT * FROM exam_orders_result;')
      console.log(result.rows)
      console.log('entro a ExamOrderResult Model')
      return result.rows
    } catch (e) {
      return null
    }
  } */

  static async getAll () {
    try {
      const result = await conn.query('SELECT * FROM exam_order JOIN exam ON exam.exam_id = exam_order.exam_order_id_exam JOIN orders ON orders.orders_id = exam_order.exam_order_id_orders;')
      console.log(result.rows)
      console.log('entro a ExamOrderResult Model')
      return result.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM exam_orders_result WHERE id_exam_orders_result = $1;', [id])
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
      const resultID = await conn.query('INSERT INTO exam_orders_result( name ,id_category ) VALUES ($1, $2 ) RETURNING *;', [name, id_category])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE exam_orders_result SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM exam_orders_result WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
