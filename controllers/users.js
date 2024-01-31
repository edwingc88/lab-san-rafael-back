import { validateUser, validatePartialUser } from '../schemas/users.js'
import multiparty from 'multiparty'
import 'dotenv/config'
import { nombreFinalImagenByFile, nombreFinalImagenByUrl } from '../middlewares/nombre_imagen.js'
import { borrarImagen } from '../middlewares/borrar_imagen.js'
/* import sendEmail from '../controllers/email.js' */
// import fs from 'fs's
const IMAGEN_UPLOAD_DIR = 'sources/images/public/'
export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  getAll = async (req, res, next) => {
    try {
      const { role } = req.query
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
    const form = new multiparty.Form({ uploadDir: './' + IMAGEN_UPLOAD_DIR })
    try {
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })
        console.log(files)
        const mombreRandomImagenCompleta = await nombreFinalImagenByFile(files) // Nombre Ramdom de la imagen  . Transformando los datos que vienen de files , quitando los [] que vienen en cada valor, para luego validarlos.

        console.log('Nombre random' + mombreRandomImagenCompleta)

        const objectImagen = JSON.stringify(files, null, 2)
        const mombreRealImagenCompleta = JSON.parse(objectImagen).abatar[0].originalFilename // Obeteniendo Nombre Real de la imagen para ver si se subio o no
        console.log('Nombre Real' + mombreRealImagenCompleta)

        if (mombreRealImagenCompleta === '') {
          console.log('vacio el Nombre Real')
          borrarImagen(mombreRandomImagenCompleta)
        }
        // console.log(JSON.parse(objectImagen).abatar[0])

        /* Si es verdadero o Hay imagen subida se va guardar esa misma, si no se guardara imagen por default */
        const rutaURLTotal = mombreRealImagenCompleta ? process.env.WEB_URL + IMAGEN_UPLOAD_DIR + mombreRandomImagenCompleta : process.env.WEB_URL + IMAGEN_UPLOAD_DIR + 'default.jpg'

        const dataObjectFields = { dni: fields.dni[0], email: fields.email[0], username: fields.username[0], password: fields.password[0], firstname: fields.firstname[0], lastname: fields.lastname[0], gender: fields.gender[0], address: fields.address[0], firstphone: fields.firstphone[0], secondphone: fields.secondphone[0], birthdate: fields.birthdate[0], blood_typing: fields.bloodtyping[0], type_relationship: fields.type_relationship[0], name_relationship: fields.name_relationship[0], created: fields.created[0], abatar: rutaURLTotal, id_role: fields.id_role[0] }
        console.log(dataObjectFields)

        const result = validateUser(dataObjectFields)

        if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

        const newUser = await this.userModel.create({ input: result.data })
        if (newUser.length === 0) return res.status(404).json({ error: 'Not found user' })
        /*
        await sendEmail() */

        return res.status(201).json(newUser)
        // return res.status(201).json(result)
      })
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res, next) => {
    const { id } = req.params
    const form = new multiparty.Form({ })
    try {
      form.parse(req, async (err, fields) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })

        /* const mombreRandomImagenCompleta = await nombreFinal(files) // Nombre Ramdom de la imagen  . Transformando los datos que vienen de files , quitando los [] que vienen en cada valor, para luego validarlos.

        console.log('Nombre random' + mombreRandomImagenCompleta)

        let rutaURLTotal = process.env.WEB_URL + IMAGEN_UPLOAD_DIR + mombreRandomImagenCompleta

        const objectImagen = JSON.stringify(files, null, 2)
        const mombreRealImagenCompleta = JSON.parse(objectImagen).abatar[0].originalFilename // Obeteniendo Nombre Real de la imagen para ver si se subio o no
        console.log('Nombre Real' + mombreRealImagenCompleta)

        if (mombreRealImagenCompleta === '') {
          console.log('vacio el Nombre Real')
          borrarImagen(mombreRandomImagenCompleta)
          rutaURLTotal = ''
        } */

        // console.log('RutaURL=' + rutaURLTotal)
        const dataObjectFields = { dni: fields.dni[0], email: fields.email[0], username: fields.username[0], password: fields.password[0], firstname: fields.firstname[0], lastname: fields.lastname[0], gender: fields.gender[0], address: fields.address[0], firstphone: fields.firstphone[0], secondphone: fields.secondphone[0], birthdate: fields.birthdate[0], bloodTyping: fields.bloodtyping[0], typeRelationship: fields.type_relationship[0], nameRelationship: fields.name_relationship[0], created: fields.created[0] }
        // console.log(dataObjectFields)

        const result = validatePartialUser(dataObjectFields)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const updateduser = await this.userModel.update({ id, input: result.data })

        // console.log(updateduser)

        if (updateduser.length === 0) return res.status(404).json({ error: 'Not found user' })

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
      /* const separador = JSON.parse(result)
      console.log(separador)
      console.log('jsonresult arriba') */
      // console.log(result[0].user_abatar)

      if (nombreFinalImagenByUrl(result[0].user_abatar) !== 'default.jpg') {
        /* const imagenBorrar = IMAGEN_UPLOAD_DIR + nombreFinalImagenDB(result[0].user_abatar)
        fs.unlink(imagenBorrar, function (err) {
          if (err) { console.error(err) }
          console.log('File deleted!')
        }) */
        const namIMGBorrar = nombreFinalImagenByUrl(result[0].user_abatar)
        console.log(namIMGBorrar)
        borrarImagen(namIMGBorrar)
      }

      return res.status(201).json({ message: 'user deleted' })
    } catch (error) {
      next(error)
    }
  }

  deleteImg = async (req, res, next) => {
    try {
      const { id } = req.params
      const rutaImgDefault = process.env.WEB_URL + IMAGEN_UPLOAD_DIR + 'default.jpg'
      const result = await this.userModel.deleteImg({ id, rutaImgDefault })
      console.log(result)
      return res.status(201).json({ message: 'Imagen deleted' })
    } catch (error) {
      next(error)
    }
  }
}
