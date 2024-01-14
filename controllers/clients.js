import { validateClient, validatePartialClient } from '../schemas/clients.js'
import multiparty from 'multiparty'
import 'dotenv/config'
import { nombreFinalImagenByFile, nombreFinalImagenByUrl } from '../middlewares/nombre_imagen.js'
import { borrarImagen } from '../middlewares/borrar_imagen.js'
// import fs from 'fs's
const IMAGEN_UPLOAD_DIR = 'sources/images/public/'
export class ClientController {
  constructor ({ clientModel }) {
    this.clientModel = clientModel
  }

  getAll = async (req, res, next) => {
    try {
      const { role } = req.query
      const clients = await this.clientModel.getAll(role)
      if (clients.length === 0) return res.status(404).json({ error: 'Not found client' })
      return res.status(201).json(clients)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const client = await this.clientModel.getById(id)
      if (client.length === 0) return res.status(404).json({ error: 'Not found client' })
      return res.status(201).json(client)
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    // const result = validateClient(req.body)
    // console.log(result)
    const form = new multiparty.Form({ uploadDir: './' + IMAGEN_UPLOAD_DIR })
    try {
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })

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

        const result = validateClient(dataObjectFields)

        if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

        const newClient = await this.clientModel.create({ input: result.data })
        if (newClient.length === 0) return res.status(404).json({ error: 'Not found client' })
        return res.status(201).json(newClient)
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
        const dataObjectFields = { dni: fields.dni[0], email: fields.email[0], username: fields.username[0], password: fields.password[0], firstname: fields.firstname[0], lastname: fields.lastname[0], gender: fields.gender[0], address: fields.address[0], firstphone: fields.firstphone[0], secondphone: fields.secondphone[0], birthdate: fields.birthdate[0], bloodTyping: fields.bloodtyping[0], typeRelationship: fields.type_relationship[0], nameRelationship: fields.name_relationship[0], created: fields.created[0], idRole: fields.id_role[0] }
        // console.log(dataObjectFields)

        const result = validatePartialClient(dataObjectFields)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const updatedclient = await this.clientModel.update({ id, input: result })

        // console.log(updatedclient)

        if (updatedclient.length === 0) return res.status(404).json({ error: 'Not found client' })

        return res.status(201).json(updatedclient)
      })

      /* const result = validatePartialClient(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedclient = await this.clientModell.update({ id, input: result.data })
    if (!updatedclient) return res.status(404).json({ error: 'Not found client' })
    return res.json(updatedclient) */
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
        console.log(fields)
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

        const updatedclient = await this.clientModel.updateImg({ id, input: rutaURLTotal })

        return res.status(201).json(updatedclient)
      })

      /* const result = validatePartialClient(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedclient = await this.clientModell.update({ id, input: result.data })
    if (!updatedclient) return res.status(404).json({ error: 'Not found client' })
    return res.json(updatedclient) */
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.clientModel.delete({ id })
      if (result.length === 0) return res.status(404).json({ error: 'Not found client' })
      /* const separador = JSON.parse(result)
      console.log(separador)
      console.log('jsonresult arriba') */
      // console.log(result[0].client_abatar)

      if (nombreFinalImagenByUrl(result[0].client_abatar) !== 'default.jpg') {
        /* const imagenBorrar = IMAGEN_UPLOAD_DIR + nombreFinalImagenDB(result[0].client_abatar)
        fs.unlink(imagenBorrar, function (err) {
          if (err) { console.error(err) }
          console.log('File deleted!')
        }) */
        const namIMGBorrar = nombreFinalImagenByUrl(result[0].client_abatar)
        console.log(namIMGBorrar)
        await borrarImagen(namIMGBorrar)
      }

      return res.status(201).json({ message: 'client deleted' })
    } catch (error) {
      next(error)
    }
  }

  deleteImg = async (req, res, next) => {
    try {
      const { id } = req.params
      const rutaImgDefault = process.env.WEB_URL + IMAGEN_UPLOAD_DIR + 'default.jpg'
      const result = await this.clientModel.deleteImg({ id, rutaImgDefault })
      console.log(result)
      return res.status(201).json({ message: 'Imagen deleted' })
    } catch (error) {
      next(error)
    }
  }
}
