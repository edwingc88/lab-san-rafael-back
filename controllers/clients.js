import { validateClient, validatePartialClient } from '../schemas/clients.js'

export class ClientController {
  constructor ({ clientModel }) {
    this.clientModel = clientModel
  }

  getAll = async (req, res) => {
    const { role } = req.query
    const Clients = await this.clientModel.getAll({ role })
    if (Clients.length === 0) return res.status(404).json({ error: 'Not found Client' })
    res.json(Clients)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const Client = await this.clientModel.getById(id)
    console.log(Client)
    if (Client) return res.json(Client)
    res.status(404).json({ error: 'Not found Client' })
  }

  create = async (req, res) => {
    const result = validateClient(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newClient = await this.clientModel.create({ input: result.data })

    res.status(201).json(newClient)
  }

  update = async (req, res) => {
    const result = validatePartialClient(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedClient = await this.clientModell.update({ id, input: result.data })
    if (!updatedClient) return res.status(404).json({ error: 'Not found Client' })
    return res.json(updatedClient)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.clientModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found Client' })
    return res.json({ message: 'Client deleted' })
  }
}
