import { validateGender, validatePartialGender } from '../schemas/genders.js'

export class GenderController {
  constructor ({ genderModel }) {
    this.genderModel = genderModel
  }

  getAll = async (req, res) => {
    const genders = await this.genderModel.getAll()
    if (genders.length === null) return res.status(404).json({ msj: 'Empty  genders' })
    if (genders.length === 0) return res.status(201).json({ msj: 'Empty  genders' })
    res.json(genders)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const gender = await this.genderModel.getById(id)
    console.log(gender)
    if (gender) return res.json(gender)
    res.status(404).json({ error: 'Not found gender' })
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

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.genderModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found gender' })
    return res.json({ message: 'gender deleted' })
  }
}
