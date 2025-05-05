import conn from './db.js'
export class OrderModel {
  static async getAll (idUser) {
    try {
      console.log('Entro en Model ', idUser)
      if (idUser) {
        const loweCaseUserID = idUser.toLowerCase()
        const res = await conn.query('SELECT * FROM orders WHERE orders_id_users = $1;', [loweCaseUserID])
        //  const res = await conn.query('SELECT * FROM orders JOIN users ON users.users_id = orders.orders_id_users ;')
        return res.rows
      }
      // const result = await conn.query('SELECT * FROM orders INNER JOIN exam ON exam.exam_id = orders.orders_id_exam ;')
      /*       const result = await conn.query('SELECT * FROM orders;') */
      const result = await conn.query('SELECT * FROM orders JOIN users ON users.users_id = orders.orders_id_users  JOIN order_statu ON order_statu.order_statu_id = orders.orders_id_order_statu ;')
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
      console.log('Entro en Model ', id)
      const result = await conn.query('SELECT * FROM orders WHERE orders_id = $1;', [id])
      /*       const [clients] = result.rows
      if (clients.length === 0) return null */
      return result.rows
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { number, date, observation, id_users, id_order_statu } = input
    console.log('debug models')
    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO orders( orders_number ,orders_date , orders_observation, orders_id_users, orders_id_order_statu ) VALUES ($1, $2,$3,$4,$5 ) RETURNING *;', [number, date, observation, id_users, id_order_statu])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async createOrdenDeUsuario ({ input }) {
    // eslint-disable-next-line camelcase
    const { idCustomer, date, observation, exams, payment, status } = input
    const { total, change, depositBs, depositRef, dolar } = payment

    console.log('Model creandoOrdenDeUsuario', idCustomer, observation, exams, total, depositBs, depositRef, dolar, status)

    const results = await conn.query('INSERT INTO orders( orders_date, orders_observation, orders_id_users, orders_id_order_status ) VALUES ($1, $2,$3,$4) RETURNING *;', [date, observation, idCustomer, status])

    // eslint-disable-next-line camelcase
    const { orders_id } = results.rows[0]
    console.log('Model creandoOrdenDeUsuario', orders_id)

    if (results.rows[0]) {
      for (let i = 0; i < exams.length; i++) {
        const { id } = exams[i]
        console.log('Model creandoOrdenDeUsuario', id)
        // eslint-disable-next-line camelcase
        await conn.query('INSERT INTO exam_order_relation(exam_order_relation_id_exam, exam_order_relation_id_order ) VALUES ($1, $2);', [id, orders_id])
      }
      // eslint-disable-next-line camelcase
      await conn.query('INSERT INTO payment( payment_total, payment_change, payment_bs, payment_dolar, payment_reference, payment_id_payment_status, payment_id_orders ) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *;', [total, change, depositBs, dolar, depositRef, 1, orders_id])
    }

    /*     console.log('Model creandoOrdenDeUsuario', idCustomer, exams, payment) */

    // eslint-disable-next-line camelcase
    /* const results = await conn.query('INSERT INTO exam_orders_result( exam_orders_result_id_exam ,exam_orders_result_id_category, exam_orders_result_id_orders ) VALUES ($1, $2, $3) RETURNING *;', [id_exam, id_category, id]) */
    /*     return results.rows */
    return results.rows
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
    console.log('id en model', id)
    const result = await conn.query('DELETE FROM orders WHERE orders_id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
