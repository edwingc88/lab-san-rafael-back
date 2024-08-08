import conn from './db.js'
/*
import fs from 'fs'
import { join, basename } from 'path' */

import { nombreFinalImagenByUrl } from '../../middlewares/nombre_imagen.js'
import { borrarImagen } from '../../middlewares/borrar_imagen.js'

export class LabModel {
  static async getAll () {
    try {
      const res = await conn.query('SELECT * FROM lab;')
      return res.rows
    } catch (e) {
      console.log('Error DB en consutar ')
      throw new Error(e)
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM lab WHERE lab_id = $1;', [id])
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By ID ')
      throw new Error(e)
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { name, rif, slogan, description, objetive, mission, vision, email, address, phone, logo } = input

    try {
      // eslint-disable-next-line camelcase
      const res = await conn.query('INSERT INTO lab (lab_name,lab_rif,lab_slogan,lab_description,lab_objetive,lab_mission,lab_vision,lab_email,lab_address,lab_phone,lab_logo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;', [name, rif, slogan, description, objetive, mission, vision, email, address, phone, logo])
      console.log('Model DB LAB Bien')
      console.log(res.rows)
      return (res.rows)
      // return ({ input })
    } catch (e) {
      throw new Error(e + ': Error DB creating Lab')
    }
  }

  static async update ({ idupdate, input }) {
    try {
    // eslint-disable-next-line camelcase
      const { name, rif, slogan, description, objetive, mission, vision, email, address, phone /* , logo */ } = input

      /*     console.log('entro en bd update')
    console.log('ruta del logo: ', logo)
 */
      /*
      if (logo === '') {
        console.log('default NO hacer nada con Imagen')
        // eslint-disable-next-line camelcase
        const result = await conn.query('UPDATE lab SET name=$1,rif=$2,slogan=$3,description=$4,objetive=$5,mission=$6,vision=$7,email=$8,address=$9,phone=$10 WHERE lab_id = $11 RETURNING *;', [name, rif, slogan, description, objetive, mission, vision, email, address, phone, idupdate])
        console.log(result.rows)
        return result.rows
      } else { */
      // const rutaArchivo = 'sources/images/public/'
      /*        console.log(logo)
        console.log('logo HAY que cambiar el logo')
        const result1 = await conn.query('SELECT logo FROM lab WHERE id=$1', [idupdate])
        const rutaArchivo = `sources/images/public/${basename(result1.rows[0].logo)}`
        fs.unlink(rutaArchivo, function (err) {
          if (err) {
            console.error(err)
            fs.unlink(join('sources', 'public', 'images', result1.rows[0].logo), function (err) {
              if (err) { console.error(err) }
              console.log('File deleted Local!')
            })
          } else {
            console.log('File deleted Render UPDATE!')
          }
        }) */
      // eslint-disable-next-line camelcase
      const result = await conn.query('UPDATE lab SET lab_name=$1,lab_rif=$2,lab_slogan=$3,lab_description=$4,lab_objetive=$5,lab_mission=$6,lab_vision=$7,lab_email=$8,lab_address=$9,lab_phone=$10 WHERE lab_id = $11 RETURNING *;', [name, rif, slogan, description, objetive, mission, vision, email, address, phone, idupdate])
      console.log(result.rows)
      return result.rows
      // }
    } catch (e) {
      throw new Error('Error DB creating Lab')
    }
  }

  static async updateImg ({ id, input }) {
    try {
      // eslint-disable-next-line camelcase
      const logo = input

      /*      console.log('entro en model udate img: ' + abatar + id)

      const resultUrlDelete = await conn.query('SELECT users_abatar FROM users WHERE users_id = $1;', [id])

      if (resultUrlDelete.row === 0) return resultUrlDelete.row

      const abatarUrlDelete = resultUrlDelete.rows[0].users_abatar
      const nombreImgDelete = nombreFinalImagenByUrl(abatarUrlDelete)
      console.log(abatarUrlDelete)
      console.log(nombreImgDelete) */

      const resultUrlDelete = await conn.query('SELECT lab_logo FROM lab WHERE lab_id = $1;', [id])

      if (resultUrlDelete.row === 0) return resultUrlDelete.row

      const nombreImgDelete = nombreFinalImagenByUrl(resultUrlDelete.rows[0].lab_logo)
      if (nombreImgDelete !== 'default.jpg') {
        console.log('BOORANDO ARCHIVO')
        await borrarImagen(nombreImgDelete)
      }

      const result = await conn.query('UPDATE lab SET lab_logo=$1 WHERE lab_id=$2 RETURNING *;', [logo, id])
      return result.rows
    } catch (e) {
      console.log('Error DB en Users IMG update')
      throw new Error(e)
    }
  }

  static async delete ({ id }) {
    try {
      const result = await conn.query('DELETE FROM lab WHERE lab_id = $1 returning *;', [id])
      return result.rows
    } catch (e) {
      console.log('Error delete  db labs')
      throw new Error(e)
    }
  }

  static async deleteImg ({ id, rutaImgDefault }) {
    try {
      const resultUrlDelete = await conn.query('SELECT lab_logo FROM lab WHERE lab_id = $1;', [id])

      if (resultUrlDelete.row === 0) return resultUrlDelete.row

      const abatarUrlDelete = resultUrlDelete.rows[0].lab_logo
      const nombreImgDelete = nombreFinalImagenByUrl(abatarUrlDelete)

      if (nombreImgDelete !== 'noimage.jpg') {
        console.log('Condicion de BOORANDO ARCHIVO que a ingresado')
        await borrarImagen(nombreImgDelete)
      }

      const result = await conn.query('UPDATE lab SET lab_logo = $1  WHERE lab_id = $2 RETURNING *;', [rutaImgDefault, id])
      return result.rows
    } catch (e) {
      console.log('Error DB en lab By DeleteIMG ')
      throw new Error(e)
    }
  }
}
