import { Router } from 'express'

import { PersonController } from '../controllers/persons.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createPersonRouter = ({ personModel }) => {
  const personsRouter = Router()

  const personController = new PersonController({ personModel })

  personsRouter.get('/', [verifyToken], personController.getAll)

  personsRouter.get('/:id', [verifyToken], personController.getById)

  personsRouter.post('/', personController.create)

  personsRouter.patch('/:id', [verifyToken, isAdmin], personController.update)

  personsRouter.delete('/:id', [verifyToken, isAdmin], personController.delete)

  return personsRouter
}
