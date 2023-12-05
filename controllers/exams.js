import { validateExam, validatePartialExam } from '../schemas/exams.js'

export class ExamController {
  constructor ({ examModel }) {
    this.examModel = examModel
  }

  getAll = async (req, res) => {
    const Exams = await this.examModel.getAll()
    if (Exams.length === 0) return res.status(404).json({ msj: 'Empty  Exams' })
    res.json(Exams)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const Exam = await this.examModel.getById(id)
    console.log(Exam)
    if (Exam) return res.json(Exam)
    res.status(404).json({ error: 'Not found Exam' })
  }

  create = async (req, res) => {
    const result = validateExam(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newExam = await this.examModel.create({ input: result.data })

    res.status(201).json(newExam)
  }

  update = async (req, res) => {
    const result = validatePartialExam(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedExam = await this.examModell.update({ id, input: result.data })
    if (!updatedExam) return res.status(404).json({ error: 'Not found Exam' })
    return res.json(updatedExam)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.examModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found Exam' })
    return res.json({ message: 'Exam deleted' })
  }
}
