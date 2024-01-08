import conn from './db.js'
export class CompousedModel {
  static async getAll () {
    try {
      /* if (_category) {
        const loweCaseCategoryID = _category.toLowerCase()
        const res = await conn.query('SELECT * FROM compoused WHERE compoused_id_category = $1;', [loweCaseCategoryID])
        return res.rows
      } */
      const result = await conn.query('SELECT * FROM compoused INNER JOIN exam ON exam.exam_id = compoused.compoused_id_exam ;')
      // const result = await conn.query('SELECT * FROM compoused;')
      console.log(result.rows)
      console.log('entro a Compoused Model')
      return result.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM compoused WHERE id_compoused = $1;', [id])
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
      const resultID = await conn.query('INSERT INTO compoused( name ,id_category ) VALUES ($1, $2 ) RETURNING *;', [name, id_category])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE compoused SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM compoused WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}
