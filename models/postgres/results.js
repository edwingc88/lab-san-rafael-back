import conn from './db.js'
export class ResultModel {
  static async getAll () {
    try {
      /*       if (_category) {
        const loweCaseCategoryID = _category.toLowerCase()
        const res = await conn.query('SELECT * FROM result WHERE result_id_category = $1;', [loweCaseCategoryID])
        return res.rows
      } */
      // const result = await conn.query('SELECT * FROM result INNER JOIN category ON result.result_id_category = category.category_id INNER JOIN sub_category ON category.category_id_sub_category = sub_category.sub_category_id;')
      const result = await conn.query('SELECT * FROM result')
      console.log(result.rows)
      console.log('entro a Result Model')
      return result.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM result WHERE result_id = $1;', [id])
      /*     const [clients] = result.rows
      if (clients.length === 0) return null */
      return result.rows
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { observation, value, id_parameter, id_exam, id_order } = input
    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO result( result_value,result_observation ,result_id_parameter, result_id_exam, result_id_order ) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [observation, value, id_parameter, id_exam, id_order])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE result SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    try {
      console.log(id)
      const result = await conn.query('DELETE FROM result WHERE result_id = $1 returning *;', [id])

      console.log(result.rows)

      return result.rows
    } catch (error) {
      throw new Error('Errro creating client')
    }
  }
}
