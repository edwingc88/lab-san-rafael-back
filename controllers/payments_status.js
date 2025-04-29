import { validatePaymentStatu, validatePartialPaymentStatu } from '../schemas/payments_status.js'
import multiparty from 'multiparty'

export class PaymentStatuController {
  constructor ({ paymentStatuModel }) {
    this.paymentStatuModel = paymentStatuModel
  }

  getAll = async (req, res, next) => {
    try {
      const orderStatus = await this.paymentStatuModel.getAll()
      if (orderStatus.length === 0) return res.status(404).json({ msj: 'Empty  orderStatus' })
      return res.status(201).json(orderStatus)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const orderStatus = await this.paymentStatuModel.getById(id)
      if (orderStatus.length === 0) return res.status(404).json({ error: 'Not found orderStatu' })
      return res.status(201).json(orderStatus) // 200 = OK, 201 = Created, 204 = No content, 400 = Bad request, 401 = Unauthorized, 403 = Forbidden, 404 = Not found, 500 = Internal server error, 503 = Service unavailable
    } catch (error) {
      next(error)
    }
  }

  /*   create = async (req, res) => {
    const result = validatePaymentStatu(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const neworderStatu = await this.paymentStatuModel.create({ input: result.data })

    res.status(201).json(neworderStatu)
  }
 */
  create = async (req, res, next) => {
    try {
      const form = new multiparty.Form()
      form.parse(req, async (err, fields) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })

        let newvalue = {}

        const claves = Object.keys(fields)

        for (let i = 0; i < claves.length; i++) {
          const clave = claves[i]
          const valor = { [clave]: fields[clave][0] }
          newvalue = { ...newvalue, ...valor }
        }

        /**  Validar Datos con Zot **/
        const resultZod = validatePaymentStatu(newvalue)

        if (resultZod.error) {
          return res.status(400).json({ error: JSON.parse(resultZod.error) })
        }
        console.log('Zot : ', resultZod.data)

        /**  Registrar en Base de Datos **/
        const newUserResult = await this.paymentStatuModel.create({ input: resultZod.data })
        return res.status(201).json(newUserResult)
      })
    } catch (error) {
      next(error)
    }
  }

  /*   update = async (req, res) => {
    const result = validatePartialPaymentStatu(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedorderStatu = await this.paymentStatuModell.update({ id, input: result.data })
    if (!updatedorderStatu) return res.status(404).json({ error: 'Not found orderStatu' })
    return res.json(updatedorderStatu)
  } */

  update = async (req, res, next) => {
    try {
      console.log('Iniciando update en controllers')
      const { id } = req.params
      const form = new multiparty.Form()
      form.parse(req, async (err, fields) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })

        let newvalue = {}

        const claves = Object.keys(fields)

        for (let i = 0; i < claves.length; i++) {
          const clave = claves[i]
          const valor = { [clave]: fields[clave][0] }
          newvalue = { ...newvalue, ...valor }
        }

        const result = validatePartialPaymentStatu(newvalue)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const updateduser = await this.paymentStatuModel.update({ id, input: result.data })
        /*
        if (updateduser.length === 0) return res.status(404).json({ error: 'Not found Exam en Controllers' }) */

        return res.status(201).json(updateduser)
      })
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.paymentStatuModel.delete({ id })
      if (result.length === 0) return res.status(404).json({ error: 'Not found orderStatu' })
      return res.status(201).json({ message: 'orderStatu deleted' })
    } catch (error) {
      next(error)
    }
  }
}
