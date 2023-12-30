import { validateCompoused, validatePartialCompoused } from '../schemas/compouseds.js'

export class CompousedController {
  constructor ({ CompousedModel }) {
    this.CompousedModel = CompousedModel
  }

  getAll = async (req, res) => {
    // const { _category } = req.query
    // console.log(_category)

    const compouseds = await this.CompousedModel.getAll()
    if (!compouseds) return res.status(404).json({ error: 'Not found compoused' })
    if (compouseds.length === 0) return res.status(404).json({ msj: 'Empty  compouseds' })
    res.json(compouseds)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const compoused = await this.CompousedModel.getById(id)
    console.log(compoused)
    if (compoused) return res.json(compoused)
    res.status(404).json({ error: 'Not found compoused' })
  }

  create = async (req, res) => {
    const result = validateCompoused(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newcompoused = await this.CompousedModel.create({ input: result.data })

    res.status(201).json(newcompoused)
  }

  update = async (req, res) => {
    const result = validatePartialCompoused(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedcompoused = await this.CompousedModell.update({ id, input: result.data })
    if (!updatedcompoused) return res.status(404).json({ error: 'Not found compoused' })
    return res.json(updatedcompoused)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.CompousedModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found compoused' })
    return res.json({ message: 'compoused deleted' })
  }
}
