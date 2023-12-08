import { validateSubCategory, validatePartialSubCategory } from '../schemas/subcategorys.js'

export class SubCategoryController {
  constructor ({ subcategoryModel }) {
    this.subcategoryModel = subcategoryModel
  }

  getAll = async (req, res) => {
    const subcategorys = await this.subcategoryModel.getAll()
    if (subcategorys.length === 0) return res.status(404).json({ msj: 'Empty  subcategorys' })
    res.json(subcategorys)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const subcategory = await this.subcategoryModel.getById(id)
    console.log(subcategory)
    if (subcategory) return res.json(subcategory)
    res.status(404).json({ error: 'Not found subcategory' })
  }

  create = async (req, res) => {
    const result = validateSubCategory(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newsubcategory = await this.subcategoryModel.create({ input: result.data })

    res.status(201).json(newsubcategory)
  }

  update = async (req, res) => {
    const result = validatePartialSubCategory(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedsubcategory = await this.subcategoryModell.update({ id, input: result.data })
    if (!updatedsubcategory) return res.status(404).json({ error: 'Not found subcategory' })
    return res.json(updatedsubcategory)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.subcategoryModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found subcategory' })
    return res.json({ message: 'subcategory deleted' })
  }
}
