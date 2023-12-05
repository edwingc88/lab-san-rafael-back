import { validatePatient, validatePartialPatient } from '../schemas/patients.js'

export class PatientController {
  constructor ({ patientModel }) {
    this.patientModel = patientModel
  }

  getAll = async (req, res) => {
    const { role } = req.query
    console.log(req.userRole)
    console.log('ariba ROl')
    const Patient = await this.patientModel.getAll({ role })
    if (Patient.length === 0) return res.status(404).json({ error: 'Not found Patient' })
    res.json(Patient)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const Patient = await this.patientModel.getById(id)
    console.log(Patient)
    if (Patient) return res.json(Patient)
    res.status(404).json({ error: 'Not found Patient' })
  }

  create = async (req, res) => {
    const result = validatePatient(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newPatient = await this.patientModel.create({ input: result.data })

    res.status(201).json(newPatient)
  }

  update = async (req, res) => {
    const result = validatePartialPatient(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedPatient = await this.patientModell.update({ id, input: result.data })
    if (!updatedPatient) return res.status(404).json({ error: 'Not found Patient' })
    return res.json(updatedPatient)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.patientModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found Patient' })
    return res.json({ message: 'Patient deleted' })
  }
}
