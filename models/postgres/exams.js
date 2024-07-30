import conn from './db.js'
export class ExamModel {
  static async getAll ({ _category }) {
    try {
      if (_category) {
        const loweCaseCategoryID = _category.toLowerCase()
        const res = await conn.query('SELECT * FROM exam JOIN exam_category ON exam.exam_id = exam_category.ec_id_exam  WHERE exam_category.ec_id_category=$1;', [loweCaseCategoryID])
        return res.rows
      }
      const result = await conn.query('SELECT * FROM exam;')
      // const result = await conn.query('SELECT * FROM exam;')
      console.log(result.rows)
      console.log('entro a Exam Model')
      return result.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM exam WHERE exam_id = $1;', [id])
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
      const resultID = await conn.query('INSERT INTO exam( name ,id_category ) VALUES ($1, $2 ) RETURNING *;', [name, id_category])
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
      const results = await conn.query('INSERT INTO exam( exam_name ,exam_description, exam_indicator, exam_unit, exam_price, exam_id_category ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [name, description, indicator, unit, price, id_category])
      return results.rows
    } catch (error) {
      console.log(error)
      throw new Error('Errro creating Exam')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE exam SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM exam WHERE exam_id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
