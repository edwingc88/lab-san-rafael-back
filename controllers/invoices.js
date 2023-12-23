import { validateInvoice, validatePartialInvoice } from '../schemas/invoices.js'

export class InvoiceController {
  constructor ({ invoiceModel }) {
    this.invoicesModel = invoiceModel
  }

  getAll = async (req, res) => {
    const { _category } = req.query
    // console.log(_category)

    const invoicess = await this.invoicesModel.getAll({ _category })
    if (invoicess.length === 0) return res.status(404).json({ msj: 'Empty  invoicess' })
    res.json(invoicess)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const invoices = await this.invoicesModel.getById(id)
    console.log(invoices)
    if (invoices) return res.json(invoices)
    res.status(404).json({ error: 'Not found invoices' })
  }

  create = async (req, res) => {
    const result = validateInvoice(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newinvoices = await this.invoicesModel.create({ input: result.data })

    res.status(201).json(newinvoices)
  }

  update = async (req, res) => {
    const result = validatePartialInvoice(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedinvoices = await this.invoicesModell.update({ id, input: result.data })
    if (!updatedinvoices) return res.status(404).json({ error: 'Not found invoices' })
    return res.json(updatedinvoices)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.invoicesModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found invoices' })
    return res.json({ message: 'invoices deleted' })
  }
}
