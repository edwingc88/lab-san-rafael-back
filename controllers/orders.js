import { validateOrder, validatePartialOrder } from '../schemas/orders.js'

export class OrderController {
  constructor ({ orderModel }) {
    this.orderModel = orderModel
  }

  getAll = async (req, res, next) => {
    try {
      const { id_user: idUser } = req.query
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

  create = async (req, res) => {
    const result = validateOrder(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const neworder = await this.orderModel.create({ input: result.data })

    res.status(201).json(neworder)
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
    const result = await this.orderModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found order' })
    return res.json({ message: 'order deleted' })
  }
}
