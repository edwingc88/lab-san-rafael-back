import conn from './db.js'

import fs from 'fs'
import { join, basename } from 'path'

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
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    console.log(input)
    console.log('en el  DB LAB entro, INPUT ARRIBA')
    // eslint-disable-next-line camelcase
    const { name, rif, slogan, description, objetive, mission, vision, email, address, phone, logo } = input
    console.log(email)
    try {
      // eslint-disable-next-line camelcase
      const res = await conn.query('INSERT INTO lab (lab_name,lab_rif,lab_slogan,lab_description,lab_objetive,lab_mission,lab_vision,lab_email,lab_address,lab_phone,lab_logo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;', [name, rif, slogan, description, objetive, mission, vision, email, address, phone, logo])
      console.log('en el  DB LAB entro tambien')
      console.log(res.rows)
      return (res.rows)
      // return ({ input })
    } catch (e) {
      throw new Error(e + ': Error DB creating Lab')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { name, rif, slogan, description, objetive, mission, vision, email, address, phone, logo } = input
    // console.log(input)
    // console.log(idupdate)
    console.log('entro en bd update')
    console.log(logo)

    /* const consultaImg = await conn.query('SELECT logo FROM lab WHERE id = $1;', [idupdate])

    const nombreImg = basename(consultaImg.rows[0].logo)
    console.log(nombreImg)
    console.log('arriba consulta URL imagen') */
    try {
      if (logo === '') {
        console.log('default NO hacer nada con Imagen')
        // eslint-disable-next-line camelcase
        const result = await conn.query('UPDATE lab SET name=$1,rif=$2,slogan=$3,description=$4,objetive=$5,mission=$6,vision=$7,email=$8,address=$9,phone=$10 WHERE id = $11 RETURNING *;', [name, rif, slogan, description, objetive, mission, vision, email, address, phone, idupdate])
        console.log(result.rows)
        return result.rows
      } else {
        // const rutaArchivo = 'sources/images/public/'
        console.log(logo)
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
        })
        // eslint-disable-next-line camelcase
        const result = await conn.query('UPDATE lab SET name=$1,rif=$2,slogan=$3,description=$4,objetive=$5,mission=$6,vision=$7,email=$8,address=$9,phone=$10,logo=$11 WHERE id = $12 RETURNING *;', [name, rif, slogan, description, objetive, mission, vision, email, address, phone, logo, idupdate])
        console.log(result.rows)
        return result.rows
      }
    } catch (e) {
      throw new Error('Error DB creating Lab')
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
}
