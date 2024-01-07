import { validateClient, validatePartialClient } from '../schemas/clients.js'

export class ClientController {
  constructor ({ clientModel }) {
    this.clientModel = clientModel
  }

  getAll = async (req, res) => {
    const { role } = req.query
    const clients = await this.clientModel.getAll(role)
    if (clients.length === 0) return res.status(404).json({ error: 'Not found client' })
    res.json(clients)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const client = await this.clientModel.getById(id)
    console.log(client)
    if (client) return res.json(client)
    res.status(404).json({ error: 'Not found client' })
  }

  create = async (req, res) => {
    const result = validateClient(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newclient = await this.clientModel.create({ input: result.data })

    res.status(201).json(newclient)
  }

  update = async (req, res) => {
    const result = validatePartialClient(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedclient = await this.clientModell.update({ id, input: result.data })
    if (!updatedclient) return res.status(404).json({ error: 'Not found client' })
    return res.json(updatedclient)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.clientModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found client' })
    return res.json({ message: 'client deleted' })
  }
}
