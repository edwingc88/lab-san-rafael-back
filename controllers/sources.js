// import { validateSource, validatePartialSource } from '../schemas/source.js'
// import { validatePartialSource } from '../schemas/source.js'

/*

import multiparty from 'multiparty'
*/
import { resolve, join } from 'path'
import fs from 'fs'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// const IMAGEN_UPLOAD_DIR = './public/images/'

export class SourceController {
  /* constructor ({ sourceModel }) {
    this.sourceModel = sourceModel
  } */

  getByIdImgPrivate = async (req, res) => {
    const { id } = req.params
    if (id) return res.sendFile(join(resolve('sources', 'images', 'private'), id))
    res.status(404).json({ error: 'Source Private: No Content' })
  }

  getByIdImgPublic = async (req, res) => {
    const { name } = req.params
    console.log(req.params)
    if (name) return res.sendFile(join(resolve('sources', 'images', 'public'), name))
    res.status(404).json({ error: 'Source: No Content' })
  }

  /*

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
    console.log(id)
    // const result = await this.sourceModel.delete({ id })

    fs.unlink('sources/images/' + id, function (err) {
      if (err) { console.error(err) }
      console.log('File deleted!')
    })

    // (result === false) return res.status(404).json({ error: 'Not found Source' })
    return res.json({ message: 'Source deleted' })
  }
}
