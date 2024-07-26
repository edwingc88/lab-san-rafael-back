import { validateOrder, validatePartialOrder } from '../schemas/orders.js'

export class OrderController {
  constructor ({ OrderModel }) {
    this.OrderModel = OrderModel
  }

  getAll = async (req, res) => {
    // const { _category } = req.query
    // console.log(_category)

    const orders = await this.OrderModel.getAll()
    if (!orders) return res.status(404).json({ error: 'Not found order' })
    if (orders.length === 0) return res.status(404).json({ msj: 'Empty  orders' })
    res.json(orders)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const order = await this.OrderModel.getById(id)
    console.log(order)
    if (order) return res.json(order)
    res.status(404).json({ error: 'Not found order' })
  }

  create = async (req, res) => {
    const result = validateOrder(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const neworder = await this.OrderModel.create({ input: result.data })

    res.status(201).json(neworder)
  }

  update = async (req, res) => {
    const result = validatePartialOrder(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedorder = await this.OrderModell.update({ id, input: result.data })
    if (!updatedorder) return res.status(404).json({ error: 'Not found order' })
    return res.json(updatedorder)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.OrderModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found order' })
    return res.json({ message: 'order deleted' })
  }
}
