import { validateCategory, validatePartialCategory } from '../schemas/categorys.js'
import multiparty from 'multiparty'

export class CategoryController {
  constructor ({ categoryModel }) {
    this.categoryModel = categoryModel
  }

  getAll = async (req, res) => {
    const categorys = await this.categoryModel.getAll()
    if (categorys.length === 0) return res.status(404).json({ msj: 'Empty  categorys' })
    res.json(categorys)
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.categoryModel.getById(id)
      /*     if (category) return res.json(category)
      res.status(404).json({ error: 'Not found category' }) */
      if (!result.length) return res.status(404).json({ error: 'Not content. Empty database' })
      return res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  /*   create = async (req, res) => {
    const result = validateCategory(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newcategory = await this.categoryModel.create({ input: result.data })

    res.status(201).json(newcategory)
  } */

  create = async (req, res, next) => {
    try {
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

        /**  Validar Datos con Zot **/
        const resultZod = validateCategory(newvalue)

        if (resultZod.error) {
          return res.status(400).json({ error: JSON.parse(resultZod.error) })
        }
        console.log('Zot : ', resultZod.data)

        /**  Registrar en Base de Datos **/
        const newResult = await this.categoryModel.create({ input: resultZod.data })
        return res.status(201).json(newResult)
      })
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res) => {
    const result = validatePartialCategory(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedcategory = await this.categoryModel.update({ id, input: result.data })
    if (!updatedcategory) return res.status(404).json({ error: 'Not found category' })
    return res.json(updatedcategory)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.categoryModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found category' })
    return res.json({ message: 'category deleted' })
  }
}
