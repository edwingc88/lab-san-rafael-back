import conn from './db.js'
export class ParameterModel {
  static async getAll ({ category }) {
    console.log('category', category)
    try {
      if (category) {
        const loweCaseCategoryID = category.toLowerCase()
        const res = await conn.query('SELECT * FROM parameter JOIN category ON parameter.parameter_id_category= category.category_id  WHERE category.category_id=$1;', [loweCaseCategoryID])
        return res.rows
      }
      const result = await conn.query('SELECT * FROM parameter;')
      console.log(result.rows)
      return result.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM parameter WHERE parameter_id = $1;', [id])
      /*   const [clients] = result.rows
      if (clients.length === 0) return null */
      return result.rows
    } catch (e) {
      return null
    }
  }

  /*   static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { name, id_category } = input

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO parameter( name ,id_category ) VALUES ($1, $2 ) RETURNING *;', [name, id_category])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  } */

  static async create ({ input }) {
    try {
      // eslint-disable-next-line camelcase
      const { name, description, indicator, unit, price, id_category } = input
      console.log('entro en IUPNU DB', input)
      // eslint-disable-next-line camelcase
      const results = await conn.query('INSERT INTO parameter( parameter_name ,parameter_description, parameter_indicator, parameter_unit, parameter_price, parameter_id_category ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [name, description, indicator, unit, price, id_category])
      return results.rows
    } catch (error) {
      console.log(error)
      throw new Error('Errro creating Parameter')
    }
  }

  static async update ({ id, input }) {
    try {
      // eslint-disable-next-line camelcase
      const { name, description, indicator, unit, price, id_category } = input
      // eslint-disable-next-line camelcase
      const result = await conn.query('UPDATE parameter SET parameter_name = $1, parameter_description = $2, parameter_indicator= $3, parameter_unit=$4, parameter_price=$5, parameter_id_category=$6 WHERE parameter_id = $7 RETURNING *;', [name, description, indicator, unit, price, id_category, id])
      console.log(' update en Model')
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  static async delete ({ id }) {
    try {
      console.log(id)
      const result = await conn.query('DELETE FROM parameter WHERE parameter_id = $1 returning *;', [id])
      return result.rows
    } catch (error) {
      throw new Error('Error deleting Parameter')
    }
  }
}
