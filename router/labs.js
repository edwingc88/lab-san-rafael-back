import { Router } from 'express'
// import { verifyToken } from '../middlewares/authjwt.js'
import { LabController } from '../controllers/labs.js'

export const createLabRouter = ({ labModel }) => {
  const labRouter = Router()

  const labController = new LabController({ labModel })

  labRouter.get('/', labController.getAll)

  labRouter.get('/:id', labController.getById)

  labRouter.post('/', labController.create)

  labRouter.patch('/:id', labController.update)

  labRouter.patch('/', labController.deleteImg)

  labRouter.delete('/:id', labController.delete)

  return labRouter
}
