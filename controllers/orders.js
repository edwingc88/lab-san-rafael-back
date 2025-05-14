import { validateOrder, validatePartialOrder, validateOrdenDeUsuario } from '../schemas/orders.js'
import multiparty from 'multiparty'

export class OrderController {
  constructor ({ orderModel }) {
    this.orderModel = orderModel
  }

  getAll = async (req, res, next) => {
    try {
      const { idUser } = req.query
      console.log('hola controller', idUser)
      const orders = await this.orderModel.getAll(idUser)
      if (!orders) return res.status(404).json({ error: 'Not found order' })
      /*     if (orders.length === 0) return res.status(404).json({ msj: 'Empty  orders' }) */
      res.json(orders)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res) => {
    const { id } = req.params
    console.log('hola controller', id)
    const result = await this.orderModel.getById(id)
    if (result.length === 0) return res.status(404).json({ error: 'Not content. Empty database' })
    res.json(result)
  }

  /*   create = async (req, res) => {
    const result = validateOrder(req.body)
    console.log('entro en create controller', result)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const neworder = await this.orderModel.create({ input: result.data })

    res.status(201).json(neworder)
  } */

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
        const resultZod = validateOrder(newvalue)

        if (resultZod.error) {
          return res.status(400).json({ error: JSON.parse(resultZod.error) })
        }
        console.log('Zot : ', resultZod.data)

        /**  Registrar en Base de Datos **/
        const newUserResult = await this.orderModel.create({ input: resultZod.data })
        return res.status(201).json(newUserResult)
      })
    } catch (error) {
      next(error)
    }
  }

  createOrdenDeUsuario = async (req, res) => {
    const result = validateOrdenDeUsuario(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newexam = await this.orderModel.createOrdenDeUsuario({ input: result.data })
    res.status(201).json(newexam)
  }

  update = async (req, res) => {
    const result = validatePartialOrder(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedorder = await this.orderModell.update({ id, input: result.data })
    if (!updatedorder) return res.status(404).json({ error: 'Not found order' })
    return res.json(updatedorder)
  }

  delete = async (req, res) => {
    const { id } = req.params
    console.log('hola controller delete', id)
    const result = await this.orderModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found order' })
    return res.json({ message: 'order deleted' })
  }
}
