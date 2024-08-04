import { validateInvoice, validatePartialInvoice } from '../schemas/invoices.js'
import multiparty from 'multiparty'

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
    if (invoices) return res.json(invoices)
    res.status(404).json({ error: 'Not found invoices' })
  }

  /*   create = async (req, res) => {
    const result = validateInvoice(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newinvoices = await this.invoicesModel.create({ input: result.data })

    res.status(201).json(newinvoices)
  } */

  create = async (req, res) => {
    const form = new multiparty.Form()

    form.parse(req, async (err, fields) => {
      if (err) return res.status(500).json({ error: 'Error msj formdata' })

      /** RECUPERANDO DATOS ITERANDO OBJETO **/
      let newvalue = {}

      const claves = Object.keys(fields)

      for (let i = 0; i < claves.length; i++) {
        const clave = claves[i]
        const valor = { [clave]: fields[clave][0] }
        newvalue = { ...newvalue, ...valor }
      }

      /**  Validar Datos con Zot **/
      const resultZod = validateInvoice(newvalue)

      if (resultZod.error) {
        return res.status(400).json({ error: JSON.parse(resultZod.error) })
      }
      console.log(resultZod.data)

      /**  Registrar en Base de Datos **/
      const newResult = await this.invoicesModel.create({ input: resultZod.data })
      res.status(201).json(newResult)
    })
  }

  update = async (req, res, next) => {
    try {
      const result = validatePartialInvoice(req.body)
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const { id } = req.params
      const updatedinvoices = await this.invoicesModel.update({ id, input: result.data })
      if (!updatedinvoices) return res.status(404).json({ error: 'Not found invoices' })
      return res.json(updatedinvoices)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.invoicesModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found invoices' })
    return res.json({ message: 'invoices deleted' })
  }
}
