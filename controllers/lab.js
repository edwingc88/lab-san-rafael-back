import { validateLab, validatePartialLab } from '../schemas/lab.js'
// import { validatePartiallab } from '../schemas/lab.js'
import multiparty from 'multiparty'
import 'dotenv/config'
import fs from 'fs'
import { extname, join } from 'path'

// import { resolve, join } from 'path'

/* import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log(__filename)
console.log('filename arriba y dirname abajao')
console.log(__dirname) */

const IMAGEN_UPLOAD_DIR = './sources/images/public/'

export class LabController {
  constructor ({ labModel }) {
    this.labModel = labModel
  }

  getAll = async (req, res) => {
    const labs = await this.labModel.getAll()
    if (labs.length === 0) return res.status(404).json({ error: 'lab: No Content' })
    console.log('laboratorio entro')
    res.json(labs)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const lab = await this.labModel.getById(id)
    console.log(lab)
    if (lab) return res.json(lab)
    res.status(404).json({ error: 'lab: No Content' })
  }

  create = async (req, res) => {
    const form = new multiparty.Form({ uploadDir: IMAGEN_UPLOAD_DIR })

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Error msj formdata' })
      }

      console.log(JSON.stringify(fields, null, 2))
      console.log(JSON.stringify(files, null, 2))
      // Obteniendo la ruta de la imagen por default
      let rutaFinalArchivo = process.env.WEB_URL + 'sources/images/public/default.jpg'

      console.log(rutaFinalArchivo)
      console.log('Arriba y abajo RutaFinal')
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

      /* fs.unlink('sources/images/public/' + nameImagenDefault, function (err) {
        if (err) {
          console.error(err)
        }
        console.log('File deleted Render!')
      })

      fs.unlink(join('sources', 'public', 'images', nameImagenDefault), function (err) {
        if (err) { console.error(err) }
        console.log('File deleted Local!')
      })
      */

      // const linkRutaBorrar = join('sources', 'images', 'public', nameImagenNula)

      // const linkRutaBorrar = nameImagenNula

      /* fs.unlink(linkRutaBorrar, function (err) {
        if (err) { console.error(err) }
        console.log('File deleted!')
      }) */

      // console.log(rutaArchivo)
      // console.log(process.env.WEB_URL)

      // const imagePath = files.logo[0].path
      // const imageFileName = imagePath.slice(imagePath.lastIndexOf('\\') + 1)

      // const imageURL = imageFileName
      // console.log(imageFileName)

      // console.log('imageFileName')
      // const imageURLCompleta = join(resolve('sources', 'images') + imageFileName)

      // console.log(JSON.stringify(fields, null, 2))
      // console.log(JSON.stringify(files, null, 2))
      // console.log(typeof (imageURLCompleta))

      console.log(fields)

      console.log('arrinba field y abajo lo iterado ')
      /// RECUPERANDO DATOS ITERANDO OBJETO
      const claves = Object.keys(fields) // claves = ["nombre", "color", "macho", "edad"]
      let newvalue = {}

      console.log(claves)

      for (let i = 0; i < claves.length; i++) {
        const clave = claves[i]
        const valor = { [clave]: fields[clave][0] }
        console.log(clave)
        console.log(valor)
        newvalue = { ...newvalue, ...valor }
      }

      newvalue.logo = rutaFinalArchivo

      console.log(newvalue)

      // const resultURL = imageURLCompleta.split('\\').join('/')
      /* const dataObject = { name: fields.name[0], description: fields.description[0], email: fields.email[0], address: fields.address[0], phone: fields.phone[0], rif: fields.rif[0], slogan: fields.slogan[0], objetive: fields.objetive[0], mission: fields.mission[0], vision: fields.vision[0], logo: rutaFinalArchivo }
*/
      // Corrigiendo cambiando dataObjetc por newvalue

      // console.log(dataObject)
      // console.log('Arriba Dataobject')

      const result = validateLab(newvalue)

      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      console.log(result.data)

      const newlab = await this.labModel.create({ input: result.data })
      // const newlab = result

      res.status(201).json(newlab)
    })
  }

  update = async (req, res) => {
    const form = new multiparty.Form({ uploadDir: IMAGEN_UPLOAD_DIR })

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Error msj formdata Update' })
      }

      console.log(JSON.stringify(fields, null, 2))
      console.log(JSON.stringify(files, null, 2))
      // console.log(Object.keys(files)[0])

      // Creando la ruta de la imagen por default
      /* rutaFinalArchivo = process.env.WEB_URL + 'sources/images/public/default.jpg'
      console.log(rutaFinalArchivo)
      console.log('Arriba RutaFinal') */
      let rutaFinalArchivo = ''
      // Obteniendo la ruta de la imagen
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

      const result = validatePartialLab(newvalue)

      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      console.log(result.data)
      console.log('resulta.DATA arriba')
      const { id } = req.params
      console.log(id)
      console.log('id arriba que pasar para actulizar')
      const updatedlab = await this.labModel.update({ idupdate: id, input: result.data })

      res.status(201).json(updatedlab)

      /* else {
        let result = {}
        newvalue.logo = rutaFinalArchivo

        result = validatePartialLab(newvalue)

        if (result.error) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        console.log(result.data)
        const { id } = req.params
        const updatedlab = await this.labModell.update({ id, input: result.data })

        res.status(201).json(updatedlab)
      } */
    })

    /// ///

    /* const result = validatePartialLab(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedlab = await this.labModell.update({ id, input: result.data })
    if (!updatedlab) return res.status(404).json({ error: 'Not found lab' })
    return res.json(updatedlab) */
  }

  deleteImg = async (req, res) => {
    const { id, logo } = req.body
    console.log(id + 'y' + logo)

    console.log('funciona deleteImg en controllers')
    // const result = await this.sourceModel.deleteImg({ id, logo })
    /* fs.unlink('sources/images/' + id, function (err) {
      if (err) { console.error(err) }
      console.log('File deleted!')
    }) */
    // console.log(result)
    // (result === false) return res.status(404).json({ error: 'Not found Source' })
    return res.json({ message: 'Source deleted IMAGE' })
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.labModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found lab' })
    const separar = result[0].logo.split(process.env.WEB_URL)
    // console.log(separar.split(process.env.WEB_URL))

    /* if (separar[1].indexOf('default') === 0) {
      console.log(separar[1].indexOf('default'))
    } */

    if (separar[1].indexOf('default') === -1) {
      fs.unlink(separar[1], function (err) {
        if (err) { console.error(err) }
        console.log('File deleted!')
      })
    }

    // console.log(separar[1].indexOf('default'))
    // console.log('resultado arriba del separador , buscando default si encuentra es 0 ')

    console.log('Delete result')
    return res.json({ message: 'lab deleted' })
  }
}
