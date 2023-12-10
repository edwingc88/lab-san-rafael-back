import { validateLab, validatePartialLab } from '../schemas/lab.js'
// import { validatePartiallab } from '../schemas/lab.js'
import multiparty from 'multiparty'
import 'dotenv/config'
import fs from 'fs'
import { join } from 'path'

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
      let rutaFinalArchivo = process.env.WEB_URL + join('sources', 'images', 'public', 'default.png')

      // console.log(Object.keys(files)[0])

      const key = Object.keys(files)[0]
      const rutaLink = files[key][0].path
      if (files[key][0].originalFilename !== '') {
        const rutaArchivo = rutaLink.replaceAll('\\', '/')
        rutaFinalArchivo = process.env.WEB_URL + rutaArchivo
      }

      console.log(rutaFinalArchivo)
      console.log('Arriba RutaFinal')
      const nameImagenDefault = rutaLink.slice(rutaLink.lastIndexOf('\\') + 1)
      console.log(nameImagenDefault)
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

      // const resultURL = imageURLCompleta.split('\\').join('/')
      const dataObject = { name: fields.name[0], description: fields.description[0], email: fields.email[0], address: fields.address[0], phone: fields.phone[0], rif: fields.rif[0], slogan: fields.slogan[0], objetive: fields.objetive[0], mission: fields.mission[0], vision: fields.vision[0], logo: rutaFinalArchivo }

      // console.log(dataObject)
      // console.log('Arriba Dataobject')

      const result = validateLab(dataObject)

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
    const result = validatePartialLab(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedlab = await this.labModell.update({ id, input: result.data })
    if (!updatedlab) return res.status(404).json({ error: 'Not found lab' })
    return res.json(updatedlab)
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
