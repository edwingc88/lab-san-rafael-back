import { validatePayment, validatePartialPayment } from '../schemas/payments.js'
import multiparty from 'multiparty'

export class PaymentController {
  constructor ({ paymentModel }) {
    this.paymentModel = paymentModel
  }

  getAll = async (req, res) => {
    const { _category } = req.query
    // console.log(_category)

    const payments = await this.paymentModel.getAll({ _category })
    if (!payments) return res.status(404).json({ msj: 'Empty  paymentss' })
    res.json(payments)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const payments = await this.paymentModel.getById(id)
    if (payments) return res.json(payments)
    res.status(404).json({ error: 'Not found payments' })
  }

  /*   create = async (req, res) => {
    const result = validatePayment(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newpayments = await this.paymentsModel.create({ input: result.data })

    res.status(201).json(newpayments)
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
      const resultZod = validatePayment(newvalue)

      if (resultZod.error) {
        return res.status(400).json({ error: JSON.parse(resultZod.error) })
      }
      console.log(resultZod.data)

      /**  Registrar en Base de Datos **/
      const newResult = await this.paymentModel.create({ input: resultZod.data })
      res.status(201).json(newResult)
    })
  }

  /*  update = async (req, res, next) => {
    try {
      const result = validatePartialPayment(req.body)
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const { id } = req.params
      const updatedpayments = await this.paymentsModel.update({ id, input: result.data })
      if (!updatedpayments) return res.status(404).json({ error: 'Not found payments' })
      return res.json(updatedpayments)
    } catch (error) {
      next(error)
    }
  } */

  update = async (req, res, next) => {
    try {
      const form = new multiparty.Form({})
      const { id } = req.params
      form.parse(req, async (err, fields) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'Error msj formdata Update' })
        }

        /// RECUPERANDO DATOS ITERANDO OBJETO
        const claves = Object.keys(fields)
        let newvalue = {}

        for (let i = 0; i < claves.length; i++) {
          const clave = claves[i]
          const valor = { [clave]: fields[clave][0] }
          newvalue = { ...newvalue, ...valor }
        }

        const result = validatePartialPayment(newvalue)

        if (result.error) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const updatedlabResult = await this.paymentModel.update({ idupdate: id, input: result.data })

        /* if (updatedlabResult.length === 0) res.status(404).json({ error: 'Payment Error' }) */

        return res.status(201).json(updatedlabResult)
      })
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.paymentModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found payments' })
    return res.json({ message: 'payments deleted' })
  }
}
