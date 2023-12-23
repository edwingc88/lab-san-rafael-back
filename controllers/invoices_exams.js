import { validateInvoiceExam, validatePartialInvoiceExam } from '../schemas/invoices_exams.js'

export class InvoiceExamController {
  constructor ({ invoiceExamModel }) {
    this.invoiceExamModel = invoiceExamModel
  }

  getAll = async (req, res) => {
    const { _category } = req.query
    // console.log(_category)

    const invoiceExams = await this.invoiceExamModel.getAll({ _category })
    if (invoiceExams.length === 0) return res.status(404).json({ msj: 'Empty  invoiceExams' })
    res.json(invoiceExams)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const invoiceExam = await this.invoiceExamModel.getById(id)
    console.log(invoiceExam)
    if (invoiceExam) return res.json(invoiceExam)
    res.status(404).json({ error: 'Not found invoiceExam' })
  }

  create = async (req, res) => {
    const result = validateInvoiceExam(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newinvoiceExam = await this.invoiceExamModel.create({ input: result.data })

    res.status(201).json(newinvoiceExam)
  }

  update = async (req, res) => {
    const result = validatePartialInvoiceExam(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedinvoiceExam = await this.invoiceExamModell.update({ id, input: result.data })
    if (!updatedinvoiceExam) return res.status(404).json({ error: 'Not found invoiceExam' })
    return res.json(updatedinvoiceExam)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.invoiceExamModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found invoiceExam' })
    return res.json({ message: 'invoiceExam deleted' })
  }
}
