import { validateOrderStatu, validatePartialOrderStatu } from '../schemas/orders_status.js'
import multiparty from 'multiparty'

export class OrderStatuController {
  constructor ({ orderStatuModel }) {
    this.orderStatuModel = orderStatuModel
  }

  getAll = async (req, res, next) => {
    try {
      const orderStatus = await this.orderStatuModel.getAll()
      if (orderStatus.length === 0) return res.status(404).json({ msj: 'Empty  orderStatus' })
      return res.status(201).json(orderStatus)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const orderStatus = await this.orderStatuModel.getById(id)
      if (orderStatus.length === 0) return res.status(404).json({ error: 'Not found orderStatu' })
      return res.status(201).json(orderStatus) // 200 = OK, 201 = Created, 204 = No content, 400 = Bad request, 401 = Unauthorized, 403 = Forbidden, 404 = Not found, 500 = Internal server error, 503 = Service unavailable
    } catch (error) {
      next(error)
    }
  }

  /*   create = async (req, res) => {
    const result = validateOrderStatu(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const neworderStatu = await this.orderStatuModel.create({ input: result.data })

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
        const resultZod = validateOrderStatu(newvalue)

        if (resultZod.error) {
          return res.status(400).json({ error: JSON.parse(resultZod.error) })
        }
        console.log('Zot : ', resultZod.data)

        /**  Registrar en Base de Datos **/
        const newUserResult = await this.orderStatuModel.create({ input: resultZod.data })
        return res.status(201).json(newUserResult)
      })
    } catch (error) {
      next(error)
    }
  }

  /*   update = async (req, res) => {
    const result = validatePartialOrderStatu(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedorderStatu = await this.orderStatuModell.update({ id, input: result.data })
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

        const result = validatePartialOrderStatu(newvalue)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const updateduser = await this.orderStatuModel.update({ id, input: result.data })
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
      const result = await this.orderStatuModel.delete({ id })
      if (result.length === 0) return res.status(404).json({ error: 'Not found orderStatu' })
      return res.status(201).json({ message: 'orderStatu deleted' })
    } catch (error) {
      next(error)
    }
  }
}
