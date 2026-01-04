import { console } from 'inspector'
import { validateExamOrderResult, validatePartialExamOrderResult } from '../schemas/exams_orders.js'

export class ExamOrderResultController {
  constructor ({ examOrderResultModel }) {
    this.examOrderResultModel = examOrderResultModel
  }

  getAll = async (req, res, next) => {
    const { orderId } = req.query
    try {
      const examsCategorys = await this.examOrderResultModel.getAll({ orderId })
      if (examsCategorys.length === null) return res.status(404).json({ msj: 'Empty  examsOrders' })
      res.json(examsCategorys)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    const { id } = req.params
    console.log('hola controller examen orders', id)
    const examsOrders = await this.examOrderResultModel.getById(id)
    console.log(examsOrders)
    if (examsOrders) return res.json(examsOrders)
    res.status(404).json({ error: 'Not found Exams Orders' })
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

    deleteExam = async (req, res) => {
    const { idOrder, idExam } = req.params
    const result = await this.examOrderResultModel.deleteExam({ idOrder, idExam })
    if (result === false) return res.status(404).json({ error: 'Not found exam' })
    return res.json({ message: 'exam relation order deleted' })
  }
}
