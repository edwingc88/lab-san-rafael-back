// import { validateSource, validatePartialSource } from '../schemas/source.js'
// import { validatePartialSource } from '../schemas/source.js'

/*

import multiparty from 'multiparty'
*/

import { resolve, join } from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// const IMAGEN_UPLOAD_DIR = './public/images/'

export class SourceController {
  /* constructor ({ sourceModel }) {
    this.sourceModel = sourceModel
  } */

  getAll = async (req, res) => {
    const Sources = await this.sourceModel.getAll()
    if (Sources.length === 0) return res.status(404).json({ error: 'Source: No Content' })
    console.log('sourceoratorio entro')
    res.json(Sources)
  }

  getByIdImg = async (req, res) => {
    const { id } = req.params
    // const Source = await this.sourceModel.getById(id)

    /* console.log(id)
    console.log(__dirname)
    console.log(join(resolve('sources', 'images'), id))
    console.log('filname y dirname arriba')
    */

    // if (id) return res.json(id)
    if (id) return res.sendFile(join(resolve('sources', 'images'), id))
    res.status(404).json({ error: 'Source: No Content' })
  }

  getByIdPdf = async (req, res) => {
    const { id } = req.params
    // const Source = await this.sourceModel.getById(id)

    /*
    console.log(id)
    console.log(__dirname)
    console.log(join(resolve('sources', 'images'), id))
    console.log('filname y dirname arriba')
    */

    // if (id) return res.json(id)
    if (id) return res.sendFile(join(resolve('sources', 'pdf'), id))
    res.status(404).json({ error: 'Source: No Content' })
  }

  /*
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
      const imageURL = imageFileName
      const imageURLCompleta = join(resolve('./sources/images/') + imageURL)
      console.log(imageURLCompleta)
      console.log(JSON.stringify(fields, null, 2))
      console.log(JSON.stringify(files, null, 2))

      const data = { name: fields.name[0], description: fields.description[0], email: fields.email[0], address: fields.address[0], phone: fields.phone[0], rif: fields.rif[0], slogan: fields.slogan[0], logo: imageURL }

      console.log(data)

      const result = validateSource(data)

      console.log('entro en controller LAB arriba el req. body')
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      // const newSource = await this.sourceModel.create({ input: result })

      res.status(201).json(result)
    })
  }

  update = async (req, res) => {
    const result = validatePartialSource(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedSource = await this.sourceModell.update({ id, input: result.data })
    if (!updatedSource) return res.status(404).json({ error: 'Not found Source' })
    return res.json(updatedSource)
  } */

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.sourceModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found Source' })
    return res.json({ message: 'Source deleted' })
  }
}
