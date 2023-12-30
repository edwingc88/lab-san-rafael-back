import { validateExamCategory, validatePartialExamCategory } from '../schemas/exams_categorys.js'

export class ExamCategoryController {
  constructor ({ examCategoryModel }) {
    this.examCategoryModel = examCategoryModel
  }

  getAll = async (req, res) => {
    const { _category } = req.query
    // console.log(_category)

    const examsCategorys = await this.examCategoryModel.getAll({ _category })
    if (examsCategorys.length === null) return res.status(404).json({ msj: 'Empty  examsCategorys' })
    if (examsCategorys.length === 0) return res.status(201).json({ msj: 'Empty  examsCategorys' })
    res.json(examsCategorys)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const exam = await this.examCategoryModel.getById(id)
    console.log(exam)
    if (exam) return res.json(exam)
    res.status(404).json({ error: 'Not found exam' })
  }

  create = async (req, res) => {
    const result = validateExamCategory(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newexam = await this.examCategoryModel.create({ input: result.data })

    res.status(201).json(newexam)
  }

  update = async (req, res) => {
    const result = validatePartialExamCategory(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedexam = await this.examCategoryModell.update({ id, input: result.data })
    if (!updatedexam) return res.status(404).json({ error: 'Not found exam' })
    return res.json(updatedexam)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.examCategoryModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found exam' })
    return res.json({ message: 'exam deleted' })
  }
}
