import conn from './db.js'
export class ParameterModel {
  static async getAll ({ exam }) {
    console.log('category', exam)
    try {
      if (exam) {
        /*         const loweCaseCategoryID = category.toLowerCase() */
        const res = await conn.query('SELECT * FROM parameter JOIN exam ON parameter.parameter_id_exam= exam.exam_id WHERE exam.exam_id=$1;', [exam])
        return res.rows
      }
      const result = await conn.query('SELECT * FROM parameter JOIN exam ON parameter.parameter_id_exam= exam.exam_id;')
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
      const { name, value, unit, id_exam } = input
      console.log('entro en IUPNU DB', input)
      // eslint-disable-next-line camelcase
      const results = await conn.query('INSERT INTO parameter( parameter_name ,parameter_value, parameter_unit, parameter_id_exam ) VALUES ($1, $2, $3, $4) RETURNING *;', [name, value, unit, id_exam])
      return results.rows
    } catch (error) {
      console.log(error)
      throw new Error('Errro creating Parameter')
    }
  }

  static async update ({ id, input }) {
    try {
      // eslint-disable-next-line camelcase
      const { name, value, unit, id_exam } = input
      // eslint-disable-next-line camelcase
      const result = await conn.query('UPDATE parameter SET parameter_name = $1, parameter_value = $2,  parameter_unit=$3, parameter_id_exam=$4 WHERE parameter_id = $7 RETURNING *;', [name, value, unit, id_exam, id])
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
