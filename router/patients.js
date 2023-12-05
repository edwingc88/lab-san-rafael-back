import { Router } from 'express'

import { PatientController } from '../controllers/patients.js'

import { verifyToken } from '../middlewares/authjwt.js'

export const createPatientRouter = ({ patientModel }) => {
  const patientsRouter = Router()

  const patientController = new PatientController({ patientModel })

  patientsRouter.get('/', patientController.getAll)

  patientsRouter.get('/:id', [verifyToken], patientController.getById)

  patientsRouter.post('/', patientController.create)

  patientsRouter.patch('/:id', [verifyToken], patientController.update)

  patientsRouter.delete('/:id', [verifyToken], patientController.delete)

  return patientsRouter
}
