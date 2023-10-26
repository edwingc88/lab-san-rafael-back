import { Router } from 'express'

import { PersonController } from '../controllers/persons.js'

export const createPersonRouter = ({ personModel }) => {
  const personsRouter = Router()

  const personController = new PersonController({ personModel })

  personsRouter.get('/', personController.getAll)

  personsRouter.get('/:id', personController.getById)

  personsRouter.post('/', personController.create)

  personsRouter.patch('/:id', personController.update)

  personsRouter.delete('/:id', personController.delete)

  return personsRouter
}
