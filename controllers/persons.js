// import { PersonModel } from '../models/local-file-system/Person.js'
// import { PersonModel } from '../models/mysql/Person.js'
import { PersonModel } from '../models/postgres/persons.js'

// import { validatePerson, validatePartialPerson } from '../schemas/persons.js'

export class PersonController {
  static async getAll (req, res) {
    const { role } = req.query
    const Persons = await PersonModel.getAll({ role })
    if (Persons.length === 0) return res.status(404).json({ error: 'Not found Person' })
    res.json(Persons)
  }

  /*
  static async getById (req, res) {
    const { id } = req.params
    const Person = await PersonModel.getById(id)
    console.log(Person)
    if (Person) return res.json(Person)
    res.status(404).json({ error: 'Not found Person' })
  }

  static async create (req, res) {
    const result = validatePerson(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newPerson = await PersonModel.create({ input: result.data })

    res.status(201).json(newPerson)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await PersonModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found Person' })
    return res.json({ message: 'Person deleted' })
  }

  static async update (req, res) {
    const result = validatePartialPerson(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedPerson = await PersonModel.update({ id, input: result.data })
    if (!updatedPerson) return res.status(404).json({ error: 'Not found Person' })
    return res.json(updatedPerson)
  }
  */
}
