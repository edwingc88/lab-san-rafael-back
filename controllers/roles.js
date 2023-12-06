import { validateRole, validatePartialRole } from '../schemas/roles.js'

export class RoleController {
  constructor ({ roleModel }) {
    this.roleModel = roleModel
  }

  getAll = async (req, res) => {
    const roles = await this.roleModel.getAll()
    if (roles.length === 0) return res.status(404).json({ error: 'Not found roles' })
    res.json(roles)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const roles = await this.roleModel.getById(id)
    console.log(roles)
    if (roles) return res.json(roles)
    res.status(404).json({ error: 'Not found roles' })
  }

  create = async (req, res) => {
    const result = validateRole(req.body)
    console.log('entro en controller')

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newroles = await this.roleModel.create({ input: result.data })

    res.status(201).json(newroles)
  }

  update = async (req, res) => {
    const result = validatePartialRole(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedroles = await this.roleModell.update({ id, input: result.data })
    if (!updatedroles) return res.status(404).json({ error: 'Not found roles' })
    return res.json(updatedroles)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.roleModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found roles' })
    return res.json({ message: 'roles deleted' })
  }
}
