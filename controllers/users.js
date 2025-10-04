import { validateUser, validatePartialUser } from '../schemas/users.js'
import multiparty from 'multiparty'
import 'dotenv/config'
import { nombreFinalImagenByFile, nombreFinalImagenByUrl } from '../middlewares/nombre_imagen.js'
import fs from 'fs'
import { borrarImagen } from '../middlewares/borrar_imagen.js'
/* import sendEmail from '../controllers/email.js' */
// import fs from 'fs's
import { extname, join } from 'path'
const IMAGEN_UPLOAD_DIR = 'sources/images/public/'
export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  getAll = async (req, res, next) => {
    try {
      const { role } = req.query
      console.log('Entro en controller el Role ', role)
      const users = await this.userModel.getAll(role)
      if (users.length === 0) return res.status(404).json({ error: 'Not found user' })
      return res.status(201).json(users)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await this.userModel.getById(id)
      if (user.length === 0) return res.status(404).json({ error: 'Not found user' })
      return res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    // const result = validateUser(req.body)
    // console.log(result)
    try {
      const form = new multiparty.Form({ uploadDir: './' + IMAGEN_UPLOAD_DIR })
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })
        const rutaDefault = process.env.WEB_URL + 'sources/images/public/noimage.jpg'
        let rutaDefaultFinalArchivo = process.env.WEB_URL + 'sources/images/public/default.jpg' // Obteniendo la ruta de la imagen por default
        let key = ''
        let rutaArchivo = ''
        let rutaLink = ''
        let nameImagenDefault = ''

        if (Object.keys(files).length === 0) {
          console.log('NO hay archivos')
          console.log(JSON.stringify(files, null, 2))
        } else {
          console.log('SI hay archivos')
          console.log(JSON.stringify(fields, null, 2))
          key = Object.keys(files)[0]
          rutaLink = files[key][0].path
          rutaArchivo = rutaLink.replaceAll('\\', '/')
          rutaDefaultFinalArchivo = process.env.WEB_URL + rutaArchivo
          nameImagenDefault = rutaLink.slice(rutaLink.lastIndexOf('\\') + 1)
          console.log('Entro a Objey Key , RUTA FINAL ARCHIVO:', rutaDefaultFinalArchivo)
        }

        console.log('GG NameImagenDefault:', nameImagenDefault)
        console.log('GG ruta Archivo:', rutaArchivo)
        console.log('GG ext Ruta Archivo:', extname(rutaArchivo))

        let newvalue = {}
        newvalue.abatar = rutaDefaultFinalArchivo

        if (extname(rutaArchivo) === '' && Object.keys(files)[0]) {
          fs.unlink(rutaArchivo, function (err) {
            if (err) {
              fs.unlink(join('sources', 'public', 'images', nameImagenDefault), function (err) {
                if (err) { console.error(err) }
              })
            } else {
              console.log('File deleted Archivo en la ruta : ', rutaArchivo)
            }
          })
        }

        if (extname(rutaArchivo) === '') {
          newvalue.abatar = rutaDefault
        }

        const claves = Object.keys(fields) // claves = ["nombre", "color", "macho", "edad"]

        for (let i = 0; i < claves.length; i++) {
          const clave = claves[i]
          const valor = { [clave]: fields[clave][0] }
          newvalue = { ...newvalue, ...valor }
        }

        /*     newvalue.abatar = rutaDefaultFinalArchivo */

        console.log(newvalue)

        /**  Validar Datos con Zot **/
        const resultZot = validateUser(newvalue)

        if (resultZot.error) {
          return res.status(400).json({ error: JSON.parse(resultZot.error) })
        }
        console.log('Zot : ', resultZot.data)

        /**  Registrar en Base de Datos **/
        const newUserResult = await this.userModel.create({ input: resultZot.data })
        return res.status(201).json(newUserResult)
      })
    } catch (error) {
      next(error)
    }
  }

  /*   update = async (req, res, next) => {
    const { id } = req.params
    const form = new multiparty.Form()
    try {
      form.parse(req, async (err, fields) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })

        const dataObjectFields = { dni: fields.dni[0], email: fields.email[0], username: fields.username[0], password: fields.password[0], firstname: fields.firstname[0], lastname: fields.lastname[0], gender: fields.gender[0], address: fields.address[0], firstphone: fields.firstphone[0], secondphone: fields.secondphone[0], birthdate: fields.birthdate[0], bloodTyping: fields.bloodtyping[0], typeRelationship: fields.type_relationship[0], nameRelationship: fields.name_relationship[0], created: fields.created[0] }

        const result = validatePartialUser(dataObjectFields)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const updateduser = await this.userModel.update({ id, input: result.data })

        if (updateduser.length === 0) return res.status(404).json({ error: 'Not found user' })

        return res.status(201).json(updateduser)
      })
    } catch (error) {
      next(error)
    }
  } */

  update = async (req, res, next) => {
    try {
      const { id } = req.params
      const form = new multiparty.Form()
      form.parse(req, async (err, fields) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })

        let newvalue = {}

        const claves = Object.keys(fields)

        for (let i = 0; i < claves.length; i++) {
          const clave = claves[i]
          const valor = { [clave]: fields[clave][0] }
          newvalue = { ...newvalue, ...valor }
        }

        const result = validatePartialUser(newvalue)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const updateduser = await this.userModel.update({ id, input: result.data })

        if (updateduser.length === 0) return res.status(404).json({ error: 'Not found user' })

        return res.status(201).json(updateduser)
      })
    } catch (error) {
      next(error)
    }
  }

  updateImg = async (req, res, next) => {
    const { id } = req.params
    const form = new multiparty.Form({ uploadDir: './' + IMAGEN_UPLOAD_DIR })
    try {
      form.parse(req, async (err, fields, files) => {
        // console.log(files)
        if (err) return res.status(500).json({ error: 'Error msj formdata' })
        const mombreRandomImagenCompleta = await nombreFinalImagenByFile(files) // Nombre Ramdom de la imagen  . Transformando los datos que vienen de files , quitando los [] que vienen en cada valor, para luego validarlos.

        console.log('Nombre random' + mombreRandomImagenCompleta)
        /* Condicional para actulizar o NO */
        // let ifUpdate = true
        let rutaURLTotal = process.env.WEB_URL + IMAGEN_UPLOAD_DIR + mombreRandomImagenCompleta

        const objectImagen = JSON.stringify(files, null, 2)
        const mombreRealImagenCompleta = JSON.parse(objectImagen).abatar[0].originalFilename // Obeteniendo Nombre Real de la imagen para ver si se subio o no
        console.log('Nombre Real' + mombreRealImagenCompleta)

        if (mombreRealImagenCompleta === '') {
          console.log('vacio el Nombre Real')
          borrarImagen(mombreRandomImagenCompleta)
          // ifUpdate = false
          rutaURLTotal = ''
          return res.status(404).json({ error: 'No hay archivo que actualizar . Ingrese una imagen!' })
        }

        const updateduser = await this.userModel.updateImg({ id, input: rutaURLTotal })

        return res.status(201).json(updateduser)
      })

      /* const result = validatePartialUser(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updateduser = await this.userModell.update({ id, input: result.data })
    if (!updateduser) return res.status(404).json({ error: 'Not found user' })
    return res.json(updateduser) */
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.userModel.delete({ id })
      if (result.length === 0) return res.status(404).json({ error: 'Not found user' })
      console.log('userAbatar Antes', result[0].user_abatar)
      if (!result[0].users_abatar) {
        if (nombreFinalImagenByUrl(result[0].user_abatar) !== 'default.jpg') {
          console.log('Esta etrando aqui')
          const namIMGBorrar = nombreFinalImagenByUrl(result[0].user_abatar)
          console.log('nombre final Despues', namIMGBorrar)
          borrarImagen(namIMGBorrar)
        }
      }

      return res.status(201).json({ message: 'user deleted' })
    } catch (error) {
      next(error)
    }
  }

  /*   deleteImg = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.userModel.deleteImgByID({ id })
      console.log(result)
      return res.status(201).json({ message: 'Imagen deleted' })
    } catch (error) {
      next(error)
    }
  } */

  deleteImg = async (req, res, next) => {
    try {
      const { id } = req.params
      const rutaImgDefault = process.env.WEB_URL + IMAGEN_UPLOAD_DIR + 'default.jpg'
      const result = await this.userModel.deleteImg({ id, rutaImgDefault })
      if (result.length === 0) return res.status(404).json({ error: 'Not found image' })
      return res.status(201).json({ message: 'Imagen deleted' })
    } catch (error) {
      next(error)
    }
  }
}
