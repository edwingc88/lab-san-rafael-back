import { validatePatient, validatePartialPatient } from '../schemas/patients.js'

export class PatientController {
  constructor ({ patientModel }) {
    this.patientModel = patientModel
  }

  getAll = async (req, res) => {
    const { role } = req.query
    console.log(req.userRole)
    console.log('ariba ROl')
    const patient = await this.patientModel.getAll({ role })
    if (patient.length === 0) return res.status(404).json({ error: 'Not found patient' })
    res.json(patient)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const patient = await this.patientModel.getById(id)
    console.log(patient)
    if (patient) return res.json(patient)
    res.status(404).json({ error: 'Not found patient' })
  }

  create = async (req, res) => {
    const result = validatePatient(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newpatient = await this.patientModel.create({ input: result.data })

    res.status(201).json(newpatient)
  }

  update = async (req, res) => {
    const result = validatePartialPatient(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedpatient = await this.patientModell.update({ id, input: result.data })
    if (!updatedpatient) return res.status(404).json({ error: 'Not found patient' })
    return res.json(updatedpatient)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.patientModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found patient' })
    return res.json({ message: 'patient deleted' })
  }
}
