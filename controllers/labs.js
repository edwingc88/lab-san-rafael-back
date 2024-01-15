import { validateLab, validatePartialLab } from '../schemas/labs.js'
// import { validatePartiallab } from '../schemas/labs.js'
import multiparty from 'multiparty'
import 'dotenv/config'
import fs from 'fs'
import { extname, join } from 'path'
import { nombreFinalImagenByFile, nombreFinalImagenByUrl } from '../middlewares/nombre_imagen.js'
import { borrarImagen } from '../middlewares/borrar_imagen.js'

// import { resolve, join } from 'path'

/* import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log(__filename)
console.log('filename arriba y dirname abajao')
console.log(__dirname) */

const IMAGEN_UPLOAD_DIR = 'sources/images/public/'

export class LabController {
  constructor ({ labModel }) {
    this.labModel = labModel
  }

  getAll = async (req, res, next) => {
    try {
      const labs = await this.labModel.getAll()
      if (labs.length === 0) return res.status(404).json({ error: 'lab: No Content' })
      res.status(201).json(labs)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const labs = await this.labModel.getById(id)
      if (labs.length === 0) res.status(404).json({ error: 'lab: No Content' })
      return res.status(201).json(labs)
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res) => {
    const form = new multiparty.Form({ uploadDir: './' + IMAGEN_UPLOAD_DIR })

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: 'Error msj formdata' })

      console.log(JSON.stringify(fields, null, 2))
      console.log(JSON.stringify(files, null, 2))
      // Obteniendo la ruta de la imagen por default
      let rutaFinalArchivo = process.env.WEB_URL + 'sources/images/public/noimage.jpg'

      console.log(rutaFinalArchivo)// Ruta Final

      // console.log(Object.keys(files)[0])

      const key = Object.keys(files)[0]
      const rutaLink = files[key][0].path
      const rutaArchivo = rutaLink.replaceAll('\\', '/')
      if (files[key][0].originalFilename !== '') {
        rutaFinalArchivo = process.env.WEB_URL + rutaArchivo
        console.log(rutaFinalArchivo)
      }

      console.log('Abajo default imagen sacada de multipartys y despues ruta Archivo')
      const nameImagenDefault = rutaLink.slice(rutaLink.lastIndexOf('\\') + 1)
      console.log(nameImagenDefault)
      console.log(rutaArchivo)

      console.log(extname(rutaArchivo))

      if (extname(rutaArchivo) === '') {
        fs.unlink(rutaArchivo, function (err) {
          if (err) {
            console.error(err)
            fs.unlink(join('sources', 'public', 'images', nameImagenDefault), function (err) {
              if (err) { console.error(err) }
              console.log('File deleted Local!')
            })
          } else {
            console.log('File deleted Render!')
          }
        })
      }

      console.log(fields)

      /// RECUPERANDO DATOS ITERANDO OBJETO
      const claves = Object.keys(fields) // claves = ["nombre", "color", "macho", "edad"]
      let newvalue = {}

      for (let i = 0; i < claves.length; i++) {
        const clave = claves[i]
        const valor = { [clave]: fields[clave][0] }
        console.log(clave)
        console.log(valor)
        newvalue = { ...newvalue, ...valor }
      }

      newvalue.logo = rutaFinalArchivo

      console.log(newvalue)

      const result = validateLab(newvalue)

      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      console.log(result.data)
      const newlab = await this.labModel.create({ input: result.data })
      res.status(201).json(newlab)
    })
  }

  update = async (req, res, next) => {
    try {
      const form = new multiparty.Form({ /* uploadDir: IMAGEN_UPLOAD_DIR */})
      const { id } = req.params
      form.parse(req, async (err, fields) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'Error msj formdata Update' })
        }

        console.log(JSON.stringify(fields, null, 2))
        // console.log(JSON.stringify(files, null, 2))

        // let rutaFinalArchivo = ''
        // Obteniendo la ruta de la imagen

        ///
        /*
        const key = Object.keys(files)[0]
        const rutaLink = files[key][0].path
        const rutaArchivo = rutaLink.replaceAll('\\', '/')
        console.log(files[key][0].originalFilename)
        console.log('Arriba OriginalFAliName sacado de Multi part')
        if (files[key][0].originalFilename !== '') {
          rutaFinalArchivo = process.env.WEB_URL + rutaArchivo
          console.log(rutaFinalArchivo)
        }

        console.log('Abajo default imagen sacada de multipartys y despues ruta Archivo')
        const nameImagenDefault = rutaLink.slice(rutaLink.lastIndexOf('\\') + 1)
        console.log(nameImagenDefault)

        console.log(rutaArchivo)

        console.log(extname(rutaArchivo))

        /// RECUPERANDO DATOS ITERANDO OBJETO
        const claves = Object.keys(fields) // claves = ["nombre", "color", "macho", "edad"]
        let newvalue = {}

        console.log(claves)

        for (let i = 0; i < claves.length; i++) {
          const clave = claves[i]
          const valor = { [clave]: fields[clave][0] }
          // console.log(clave)
          // console.log(valor)
          newvalue = { ...newvalue, ...valor }
        }

        console.log(newvalue)
        console.log('Arriba NewValiue')

        // para actulizar una nueva imagen debe ingresar uno nuevo si no no hace nada

        if (extname(rutaArchivo) === '') {
          fs.unlink(rutaArchivo, function (err) {
            if (err) {
              console.error(err)
              fs.unlink(join('sources', 'public', 'images', nameImagenDefault), function (err) {
                if (err) { console.error(err) }
                console.log('File deleted Local!')
              })
            } else {
              console.log('File deleted Render UPDATE!')
            }
          })
        }

        newvalue.logo = rutaFinalArchivo
        console.log(newvalue.logo)
        console.log('Arriba NewValue logo')
        */

        /// RECUPERANDO DATOS ITERANDO OBJETO
        const claves = Object.keys(fields)
        let newvalue = {}

        for (let i = 0; i < claves.length; i++) {
          const clave = claves[i]
          const valor = { [clave]: fields[clave][0] }
          newvalue = { ...newvalue, ...valor }
        }

        const result = validatePartialLab(newvalue)

        if (result.error) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        console.log(result.data)
        console.log('resulta.DATA arriba')
        const updatedlabResult = await this.labModel.update({ idupdate: id, input: result.data })

        console.log(updatedlabResult)

        // if (updatedlab.length === 0) res.status(404).json({ error: 'Not found lab' })

        return res.status(201).json(updatedlabResult)
      })
    } catch (error) {
      next(error)
    }
  }
  /// ///
  /* const result = validatePartialLab(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedlab = await this.labModell.update({ id, input: result.data })
    if (!updatedlab) return res.status(404).json({ error: 'Not found lab' })
    return res.json(updatedlab) */

  updateImg = async (req, res, next) => {
    const { id } = req.params
    const form = new multiparty.Form({ uploadDir: './' + IMAGEN_UPLOAD_DIR })
    try {
      form.parse(req, async (err, fields, files) => {
        // console.log(files)
        if (err) return res.status(500).json({ error: 'Error msj formdata' })
        console.log(fields)
        const mombreRandomImagenCompleta = nombreFinalImagenByFile(files) // Nombre Ramdom de la imagen  . Transformando los datos que vienen de files , quitando los [] que vienen en cada valor, para luego validarlos.

        console.log('Nombre random' + mombreRandomImagenCompleta)
        /* Condicional para actulizar o NO */
        // let ifUpdate = true
        const rutaURLTotal = process.env.WEB_URL + IMAGEN_UPLOAD_DIR + mombreRandomImagenCompleta

        const objectImagen = JSON.stringify(files, null, 2)
        const mombreRealImagenCompleta = JSON.parse(objectImagen).logo[0].originalFilename // Obeteniendo Nombre Real de la imagen para ver si se subio o no
        console.log('Nombre Real' + mombreRealImagenCompleta)

        if (mombreRealImagenCompleta === '') {
          console.log('vacio el Nombre Real')
          borrarImagen(mombreRandomImagenCompleta)
          // ifUpdate = false
          // rutaURLTotal = ''
          return res.status(404).json({ error: 'No hay archivo que actualizar . Ingrese una imagen!' })
        }

        const updatedclient = await this.labModel.updateImg({ id, input: rutaURLTotal })

        return res.status(201).json(updatedclient)
      })
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.labModel.delete({ id })
      if (result.length === 0) return res.status(404).json({ error: 'Not found client' })
      /* const separador = JSON.parse(result)
      console.log(separador)
      console.log('jsonresult arriba') */
      // console.log(result[0].client_abatar)

      if (nombreFinalImagenByUrl(result[0].lab_logo) !== 'noimage.jpg') {
        const imagenBorrar = nombreFinalImagenByUrl(result[0].lab_logo)
        /* fs.unlink(imagenBorrar, function (err) {
          if (err) { console.error(err) }
          console.log('File deleted!')
        }) */
        // const namIMGBorrar = nombreFinalImagenByUrl(imagenBorrar)
        console.log(imagenBorrar)
        await borrarImagen(imagenBorrar)
      }

      return res.status(201).json({ message: 'client deleted' })
    } catch (error) {
      next(error)
    }
  }

  deleteImg = async (req, res, next) => {
    try {
      const { id } = req.params
      const rutaImgDefault = process.env.WEB_URL + IMAGEN_UPLOAD_DIR + 'noimage.jpg'
      const result = await this.labModel.deleteImg({ id, rutaImgDefault })
      if (result.length === 0) return res.status(404).json({ error: 'Not found image' })
      return res.status(201).json({ message: 'Imagen deleted' })
    } catch (error) {
      next(error)
    }
  }
}
