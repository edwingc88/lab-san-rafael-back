import { validateRole, validatePartialRole } from '../schemas/role.js'

export class RoleController {
  constructor ({ roleModel }) {
    this.roleModel = roleModel
  }

  getAll = async (req, res) => {
    const Roles = await this.roleModel.getAll()
    if (Roles.length === 0) return res.status(404).json({ error: 'Not found Role' })
    res.json(Roles)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const Role = await this.roleModel.getById(id)
    console.log(Role)
    if (Role) return res.json(Role)
    res.status(404).json({ error: 'Not found Role' })
  }

  create = async (req, res) => {
    const result = validateRole(req.body)
    console.log('entro en controller')

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newRole = await this.roleModel.create({ input: result.data })

    res.status(201).json(newRole)
  }

  update = async (req, res) => {
    const result = validatePartialRole(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedRole = await this.roleModell.update({ id, input: result.data })
    if (!updatedRole) return res.status(404).json({ error: 'Not found Role' })
    return res.json(updatedRole)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.roleModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found Role' })
    return res.json({ message: 'Role deleted' })
  }
}
