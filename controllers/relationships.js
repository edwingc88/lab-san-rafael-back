import { validateRelationship, validatePartialRelationship } from '../schemas/relationships.js'

export class RelationshipController {
  constructor ({ relationshipModel }) {
    this.relationshipModel = relationshipModel
  }

  getAll = async (req, res) => {
    const { _category } = req.query
    // console.log(_category)

    const relationships = await this.relationshipModel.getAll({ _category })
    if (relationships.length === null) return res.status(404).json({ msj: 'Empty  relationships' })
    if (relationships.length === 0) return res.status(201).json({ msj: 'Empty  relationships' })
    res.json(relationships)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const relationship = await this.relationshipModel.getById(id)
    console.log(relationship)
    if (relationship) return res.json(relationship)
    res.status(404).json({ error: 'Not found relationship' })
  }

  create = async (req, res) => {
    const result = validateRelationship(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newrelationship = await this.relationshipModel.create({ input: result.data })

    res.status(201).json(newrelationship)
  }

  update = async (req, res) => {
    const result = validatePartialRelationship(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedrelationship = await this.relationshipModell.update({ id, input: result.data })
    if (!updatedrelationship) return res.status(404).json({ error: 'Not found relationship' })
    return res.json(updatedrelationship)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.relationshipModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found relationship' })
    return res.json({ message: 'relationship deleted' })
  }
}
