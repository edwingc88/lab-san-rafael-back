import { validatecategory, validatePartialcategory } from '../schemas/categorys.js'

export class CategoryController {
  constructor ({ categoryModel }) {
    this.categoryModel = categoryModel
  }

  getAll = async (req, res) => {
    const categorys = await this.categoryModel.getAll()
    if (categorys.length === 0) return res.status(404).json({ msj: 'Empty  categorys' })
    res.json(categorys)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const category = await this.categoryModel.getById(id)
    console.log(category)
    if (category) return res.json(category)
    res.status(404).json({ error: 'Not found category' })
  }

  create = async (req, res) => {
    const result = validatecategory(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newcategory = await this.categoryModel.create({ input: result.data })

    res.status(201).json(newcategory)
  }

  update = async (req, res) => {
    const result = validatePartialcategory(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedcategory = await this.categoryModell.update({ id, input: result.data })
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
