import conn from './db.js'
// import bc from 'bcrypt'
import { nombreFinalImagenByUrl } from '../../middlewares/nombre_imagen.js'
import { borrarImagen } from '../../middlewares/borrar_imagen.js'

export class UserModel {
  static async getAll (role) {
    try {
      console.log('entro el role en Model ', role)
      if (role) {
        /*         console.log(role)
        const loweCaseRole = role.toLowerCase()
        const result = await conn.query('SELECT role_id FROM role WHERE LOWER(role_name) = $1;', [loweCaseRole])
        const roles = result.rows
        if (roles.length === 0) return roles
        const idRole = roles[0].role_id */

        const resultUsersByRole = await conn.query('SELECT * FROM users INNER JOIN role ON users.users_id_role = role.role_id WHERE role.role_id = $1;', [role])
        return resultUsersByRole.rows
      }
      const res = await conn.query('SELECT * FROM users;')
      return res.rows
    } catch (e) {
      console.log('Error DB en User ')
      throw new Error(e)
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM users WHERE users_id = $1;', [id])
      // const [users] = result.rows
      // if (users.length === 0) return null
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async create ({ input }) {
    try {
    // eslint-disable-next-line camelcase
      const { dni, email, username, password, firstname, lastname, gender, address, firstphone, secondphone, birthdate, bloodtyping, type_relationship, name_relationship, created, abatar, id_role } = input

      // const passwordHash = await bc.hash(password, 10)

      // const result = await conn.query('SELECT uuid_generate_v4() uuid;')
      // const [{ uuid }] = result.rows

      const passwordHash = password
      // eslint-disable-next-line camelcase
      const result = await conn.query('INSERT INTO users( users_dni , users_email, users_username ,users_password,users_firstname,users_lastname ,users_gender ,users_address,users_firstphone,users_secondphone,users_birthdate, users_bloodtyping,users_type_relationship,users_name_relationship,users_created, users_abatar,users_id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13,$14,$15,$16,$17) RETURNING *;', [dni, email, username, passwordHash, firstname, lastname, gender, address, firstphone, secondphone, birthdate, bloodtyping, type_relationship, name_relationship, created, abatar, id_role])
      return (result.rows)
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async update ({ id, input }) {
    try {
      // eslint-disable-next-line camelcase
      const { dni, email, username, password, firstname, lastname, gender, address, firstphone, secondphone, birthdate, bloodTyping, typeRelationship, nameRelationship, created } = input

      // const passwordHash = await bc.hash(password, 10)
      // eslint-disable-next-line camelcase

      console.log(input)

      const passwordHash = password

      const result = await conn.query('UPDATE users SET  users_dni=$1 ,users_email=$2, users_username=$3 ,users_password=$4,users_firstname=$5,users_lastname=$6 ,users_gender=$7,users_address=$8,users_firstphone=$9,users_secondphone=$10,users_birthdate=$11, users_bloodtyping=$12,users_type_relationship=$13,users_name_relationship=$14,users_created=$15 WHERE users_id=$16 RETURNING *;', [dni, email, username, passwordHash, firstname, lastname, gender, address, firstphone, secondphone, birthdate, bloodTyping, typeRelationship, nameRelationship, created, id])
      return (result.rows)
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async updateImg ({ id, input }) {
    try {
      // eslint-disable-next-line camelcase
      const abatar = input

      console.log('entro en model udate img: ' + abatar + id)

      const resultUrlDelete = await conn.query('SELECT users_abatar FROM users WHERE users_id = $1;', [id])

      if (resultUrlDelete.row === 0) return resultUrlDelete.row

      const abatarUrlDelete = resultUrlDelete.rows[0].users_abatar
      const nombreImgDelete = nombreFinalImagenByUrl(abatarUrlDelete)

      if (nombreImgDelete !== 'default.jpg') {
        console.log('BOORANDO ARCHIVO')
        await borrarImagen(nombreImgDelete)
      }

      const result = await conn.query('UPDATE users SET  users_abatar=$1 WHERE users_id=$2 RETURNING *;', [abatar, id])
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async delete ({ id }) {
    try {
      const result = await conn.query('DELETE FROM users WHERE users_id = $1 returning *;', [id])
      return result.rows
    } catch (e) {
      console.log('Error DB en Users By ID ')
      throw new Error(e)
    }
  }

  /*   static async deleteImgByID ({ id }) {
    try {
      const result = await conn.query('UPDATE users SET users_abatar = $1  WHERE users_id = $2 RETURNING *;', [rutaImgDefault, id])
      console.log(result.rows)
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By DeleteIMG ')
      throw new Error(e)
    }
  } */

  static async deleteImg ({ id, rutaImgDefault }) {
    try {
      console.log('entro en deleteIMG MODEL')
      const resultUrlDelete = await conn.query('SELECT users_abatar FROM users WHERE users_id = $1;', [id])

      if (resultUrlDelete.row === 0) return resultUrlDelete.row

      const abatarUrlDelete = resultUrlDelete.rows[0].users_abatar
      const nombreImgDelete = nombreFinalImagenByUrl(abatarUrlDelete)

      if (nombreImgDelete !== 'default.jpg') {
        console.log('Condicion de BOORANDO ARCHIVO que a ingresado')
        await borrarImagen(nombreImgDelete)
      }

      const result = await conn.query('UPDATE users SET users_abatar = $1  WHERE users_id = $2 RETURNING *;', [rutaImgDefault, id])
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By DeleteIMG Users ')
      throw new Error(e)
    }
  }
}
