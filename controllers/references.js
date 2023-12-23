import { validateReference, validatePartialReference } from '../schemas/references.js'

export class ReferenceController {
  constructor ({ referenceModel }) {
    this.referenceModel = referenceModel
  }

  getAll = async (req, res) => {
    // const { _category } = req.query
    // console.log(_category)

    const references = await this.referenceModel.getAll()
    if (!references) return res.status(404).json({ error: 'Not found reference' })
    if (references.length === 0) return res.status(404).json({ msj: 'Empty  references' })
    res.json(references)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const reference = await this.referenceModel.getById(id)
    console.log(reference)
    if (reference) return res.json(reference)
    res.status(404).json({ error: 'Not found reference' })
  }

  create = async (req, res) => {
    const result = validateReference(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newreference = await this.referenceModel.create({ input: result.data })

    res.status(201).json(newreference)
  }

  update = async (req, res) => {
    const result = validatePartialReference(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedreference = await this.referenceModell.update({ id, input: result.data })
    if (!updatedreference) return res.status(404).json({ error: 'Not found reference' })
    return res.json(updatedreference)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.referenceModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found reference' })
    return res.json({ message: 'reference deleted' })
  }
}
