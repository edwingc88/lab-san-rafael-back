import conn from './db.js'
// import bc from 'bcrypt'
import { nombreFinalImagenByUrl } from '../../middlewares/nombre_imagen.js'
import { borrarImagen } from '../../middlewares/borrar_imagen.js'

export class ClientModel {
  static async getAll (role) {
    try {
      if (role) {
        console.log(role)
        const loweCaseRole = role.toLowerCase()
        const result = await conn.query('SELECT role_id FROM role WHERE LOWER(role_name) = $1;', [loweCaseRole])
        const roles = result.rows
        if (roles.length === 0) return roles

        const idRole = roles[0].role_id
        console.log(idRole)

        const resultClientsByRole = await conn.query('SELECT * FROM client INNER JOIN role ON client.client_id_role = role.role_id WHERE role.role_id = $1;', [idRole])
        // const clients = resultRoles.rows
        return resultClientsByRole.rows
      }
      const res = await conn.query('SELECT * FROM client;')
      return res.rows
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM client WHERE client_id = $1;', [id])
      // const [clients] = result.rows
      // if (clients.length === 0) return null
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
      const result = await conn.query('INSERT INTO client( client_dni , client_email, client_username ,client_password,client_firstname,client_lastname ,client_gender ,client_address,client_firstphone,client_secondphone,client_birthdate, client_bloodtyping,client_type_relationship,client_name_relationship,client_created, client_abatar,client_id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13,$14,$15,$16,$17) RETURNING *;', [dni, email, username, passwordHash, firstname, lastname, gender, address, firstphone, secondphone, birthdate, bloodtyping, type_relationship, name_relationship, created, abatar, id_role])
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

      const result = await conn.query('UPDATE client SET  client_dni=$1 ,client_email=$2, client_username=$3 ,client_password=$4,client_firstname=$5,client_lastname=$6 ,client_gender=$7,client_address=$8,client_firstphone=$9,client_secondphone=$10,client_birthdate=$11, client_bloodtyping=$12,client_type_relationship=$13,client_name_relationship=$14,client_created=$15 WHERE client_id=$16 RETURNING *;', [dni, email, username, passwordHash, firstname, lastname, gender, address, firstphone, secondphone, birthdate, bloodTyping, typeRelationship, nameRelationship, created, id])
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

      const resultUrlDelete = await conn.query('SELECT client_abatar FROM client WHERE client_id = $1;', [id])

      if (resultUrlDelete.row === 0) return resultUrlDelete.row

      const abatarUrlDelete = resultUrlDelete.rows[0].client_abatar
      const nombreImgDelete = nombreFinalImagenByUrl(abatarUrlDelete)
      console.log(abatarUrlDelete)
      console.log(nombreImgDelete)

      if (nombreImgDelete !== 'default.jpg') {
        console.log('BOORANDO ARCHIVO')
        await borrarImagen(nombreImgDelete)
      }

      const result = await conn.query('UPDATE client SET  client_abatar=$1 WHERE client_id=$2 RETURNING *;', [abatar, id])
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async delete ({ id }) {
    try {
      const result = await conn.query('DELETE FROM client WHERE client_id = $1 returning *;', [id])
      // console.log(result.rows)
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async deleteImg ({ id, rutaImgDefault }) {
    try {
      const result = await conn.query('UPDATE client SET client_abatar = $1  WHERE client_id = $2 RETURNING *;', [rutaImgDefault, id])
      // console.log(result.rows)
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By DeleteIMG ')
      throw new Error(e)
    }
  }
}
