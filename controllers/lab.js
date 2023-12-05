import { validateLab, validatePartialLab } from '../schemas/lab.js'
// import { validatePartialLab } from '../schemas/lab.js'
import multiparty from 'multiparty'

import { dirname, resolve, join } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log(__filename)
console.log('filename arriba y dirname abajao')
console.log(__dirname)
const IMAGEN_UPLOAD_DIR = './sources/images/'

export class LabController {
  constructor ({ labModel }) {
    this.labModel = labModel
  }

  getAll = async (req, res) => {
    const Labs = await this.labModel.getAll()
    if (Labs.length === 0) return res.status(404).json({ error: 'Lab: No Content' })
    console.log('laboratorio entro')
    res.json(Labs)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const Lab = await this.labModel.getById(id)
    console.log(Lab)
    if (Lab) return res.json(Lab)
    res.status(404).json({ error: 'Lab: No Content' })
  }

  create = async (req, res) => {
    const form = new multiparty.Form({ uploadDir: IMAGEN_UPLOAD_DIR })

    console.log(__filename)
    console.log(__dirname)
    console.log('filname y dirname arriba')
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Error msj formdata' })
      }

      const imagePath = files.logo[0].path
      const imageFileName = imagePath.slice(imagePath.lastIndexOf('\\') + 1)

      // const imageURL = imageFileName
      console.log(imageFileName)
      console.log('imageFileName')
      const imageURLCompleta = join(resolve('sources', 'images') + imageFileName)
      console.log(imageURLCompleta)
      console.log('imageURLCompleta')
      console.log(JSON.stringify(fields, null, 2))
      console.log(JSON.stringify(files, null, 2))
      console.log(typeof (imageURLCompleta))

      // const resultURL = imageURLCompleta.split('\\').join('/')

      const data = { name: fields.name[0], description: fields.description[0], email: fields.email[0], address: fields.address[0], phone: fields.phone[0], rif: fields.rif[0], slogan: fields.slogan[0], logo: imageFileName }

      console.log(data)

      const result = validateLab(data)

      console.log('entro en controller LAB arriba el req. body')
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const newLab = await this.labModel.create({ input: result })

      res.status(201).json(newLab)
    })
  }

  update = async (req, res) => {
    const result = validatePartialLab(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedLab = await this.labModell.update({ id, input: result.data })
    if (!updatedLab) return res.status(404).json({ error: 'Not found Lab' })
    return res.json(updatedLab)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.labModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found Lab' })
    console.log(result)
    return res.json({ message: 'Lab deleted' })
  }
}

/*

create = async (req, res) => {
  const form = new multiparty.Form({ uploadDir: IMAGEN_UPLOAD_DIR })

  /* console.log(__filename)
    console.log(__dirname)
    console.log('filname y dirname arriba')
  */

/*
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error msj formdata' })
    }

    const imagePath = files.logo[0].path
    const imageFileName = imagePath.slice(imagePath.lastIndexOf('\\') + 1)
    // const imageURL = imageFileName
    const imageURLCompleta = join(resolve('sources', 'images') + imageFileName)
*/

/*
    console.log(imageURLCompleta)
    console.log(JSON.stringify(fields, null, 2))
    console.log(JSON.stringify(files, null, 2))
    */

/* const data = { name: fields.name[0], description: fields.description[0], email: fields.email[0], address: fields.address[0], phone: fields.phone[0], rif: fields.rif[0], slogan: fields.slogan[0], logo: imageURLCompleta }

    console.log(data)
    const result = validateLab(data)
    console.log(result)
    console.log('entro en controller LAB , arriba result')
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newLab = await this.labModel.create({ input: result })

    res.status(201).json(newLab)
  })
}

*/
