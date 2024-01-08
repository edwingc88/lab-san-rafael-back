import { validateGender, validatePartialGender } from '../schemas/genders.js'

export class GenderController {
  constructor ({ genderModel }) {
    this.genderModel = genderModel
  }

  getAll = async (req, res, next) => {
    try {
      const genders = await this.genderModel.getAll()
      if (genders.length === 0) return res.status(404).json({ msj: 'Empty  genders' })
      return res.status(201).json(genders)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const genders = await this.genderModel.getById(id)
      if (genders.length === 0) return res.status(404).json({ error: 'Not found gender' })
      return res.status(201).json(genders) // 200 = OK, 201 = Created, 204 = No content, 400 = Bad request, 401 = Unauthorized, 403 = Forbidden, 404 = Not found, 500 = Internal server error, 503 = Service unavailable
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res) => {
    const result = validateGender(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newgender = await this.genderModel.create({ input: result.data })

    res.status(201).json(newgender)
  }

  update = async (req, res) => {
    const result = validatePartialGender(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedgender = await this.genderModell.update({ id, input: result.data })
    if (!updatedgender) return res.status(404).json({ error: 'Not found gender' })
    return res.json(updatedgender)
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.genderModel.delete({ id })
      if (result.length === 0) return res.status(404).json({ error: 'Not found gender' })
      return res.status(201).json({ message: 'gender deleted' })
    } catch (error) {
      next(error)
    }
  }
}
