import { validateExamOrderResult, validatePartialExamOrderResult } from '../schemas/exams_orders.js'

export class ExamOrderResultController {
  constructor ({ examOrderResultModel }) {
    this.examOrderResultModel = examOrderResultModel
  }

  getAll = async (req, res, next) => {
  /*     const { _category } = req.query */
    // console.log(_category)
    try {
      const examsCategorys = await this.examOrderResultModel.getAll()
      if (examsCategorys.length === null) return res.status(404).json({ msj: 'Empty  examsCategorys' })
      res.json(examsCategorys)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res) => {
    const { id } = req.params
    const exam = await this.examOrderResultModel.getById(id)
    console.log(exam)
    if (exam) return res.json(exam)
    res.status(404).json({ error: 'Not found exam' })
  }

  create = async (req, res) => {
    const result = validateExamOrderResult(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newexam = await this.examOrderResultModel.create({ input: result.data })

    res.status(201).json(newexam)
  }

  update = async (req, res) => {
    const result = validatePartialExamOrderResult(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedexam = await this.ExamOrderResultModell.update({ id, input: result.data })
    if (!updatedexam) return res.status(404).json({ error: 'Not found exam' })
    return res.json(updatedexam)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.examOrderResultModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found exam' })
    return res.json({ message: 'exam deleted' })
  }
}
