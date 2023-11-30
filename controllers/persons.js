import { validatePerson, validatePartialPerson } from '../schemas/persons.js'

export class PersonController {
  constructor ({ personModel }) {
    this.personModel = personModel
  }

  getAll = async (req, res) => {
    const { role } = req.query
    console.log(req.userRole)
    console.log('ariba ROl')
    const Persons = await this.personModel.getAll({ role })
    if (Persons.length === 0) return res.status(404).json({ error: 'Not found Person' })
    res.json(Persons)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const Person = await this.personModel.getById(id)
    console.log(Person)
    if (Person) return res.json(Person)
    res.status(404).json({ error: 'Not found Person' })
  }

  create = async (req, res) => {
    const result = validatePerson(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newPerson = await this.personModel.create({ input: result.data })

    res.status(201).json(newPerson)
  }

  update = async (req, res) => {
    const result = validatePartialPerson(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedPerson = await this.personModell.update({ id, input: result.data })
    if (!updatedPerson) return res.status(404).json({ error: 'Not found Person' })
    return res.json(updatedPerson)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.personModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found Person' })
    return res.json({ message: 'Person deleted' })
  }
}
