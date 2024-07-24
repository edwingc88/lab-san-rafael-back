import { validateRole, validatePartialRole } from '../schemas/roles.js'

export class RoleController {
  constructor ({ roleModel }) {
    this.roleModel = roleModel
  }

  getAll = async (req, res, next) => {
    try {
      const roles = await this.roleModel.getAll()
      if (roles.length === 0) return res.status(404).json({ error: 'Not content. Empty database' })
      return res.status(201).json(roles)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const roles = await this.roleModel.getById(id)
      if (roles.length === 0) return res.status(404).json({ error: 'Not content. Empty database' })
      // res.status(404).json({ error: 'Not found roles' })
      return res.status(201).json(roles)
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      const result = validateRole(req.body)
      const newroles = await this.roleModel.create({ input: result.data })
      if (newroles.length === 0) return res.status(400).json({ Error: 'Empty' })
      return res.status(201).json(newroles)
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res, next) => {
    try {
      const result = validatePartialRole(req.body)
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const { id } = req.params
      console.log(id)
      const updatedroles = await this.roleModel.update({ id, input: result.data })
      if (!updatedroles || updatedroles.length === 0) return res.status(404).json({ error: 'Not found roles' })
      return res.json(updatedroles)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.roleModel.delete({ id })
      if (result.length === 0) return res.status(404).json({ error: 'Not found roles' })
      return res.status(201).json({ message: 'roles deleted' })
    } catch (error) {
      next(error)
    }
  }
}
