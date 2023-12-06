import { validateExam, validatePartialExam } from '../schemas/exams.js'

export class ExamController {
  constructor ({ examModel }) {
    this.examModel = examModel
  }

  getAll = async (req, res) => {
    const exams = await this.examModel.getAll()
    if (exams.length === 0) return res.status(404).json({ msj: 'Empty  exams' })
    res.json(exams)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const exam = await this.examModel.getById(id)
    console.log(exam)
    if (exam) return res.json(exam)
    res.status(404).json({ error: 'Not found exam' })
  }

  create = async (req, res) => {
    const result = validateExam(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newexam = await this.examModel.create({ input: result.data })

    res.status(201).json(newexam)
  }

  update = async (req, res) => {
    const result = validatePartialExam(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedexam = await this.examModell.update({ id, input: result.data })
    if (!updatedexam) return res.status(404).json({ error: 'Not found exam' })
    return res.json(updatedexam)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.examModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found exam' })
    return res.json({ message: 'exam deleted' })
  }
}
