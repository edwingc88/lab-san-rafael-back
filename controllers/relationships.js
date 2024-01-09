import { validateRelationship, validatePartialRelationship } from '../schemas/relationships.js'

export class RelationshipController {
  constructor ({ relationshipModel }) {
    this.relationshipModel = relationshipModel
  }

  getAll = async (req, res, next) => {
    try {
      const relationships = await this.relationshipModel.getAll()
      if (relationships.length === null || relationships.length === 0) return res.status(404).json({ msj: 'Empty  relationships' })
      return res.status(201).json(relationships)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const relationship = await this.relationshipModel.getById(id)
      if (relationship.length === 0) return res.status(404).json({ error: 'Not found relationship' })
      return res.status(201).json(relationship)
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      const result = validateRelationship(req.body)
      const newrelationship = await this.relationshipModel.create({ input: result.data })
      if (newrelationship.length === 0) return res.status(400).json({ error: 'Empy' })
      return res.status(201).json(newrelationship)
    } catch (error) {
      next(error)
    }
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
