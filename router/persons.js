import { Router } from 'express'
import { PersonController } from '../controllers/persons.js'

export const personsRouter = Router()

personsRouter.get('/', PersonController.getAll)

/*
personsRouter.get('/:id', PersonController.getById)

personsRouter.post('/', PersonController.create)

personsRouter.delete('/:id', PersonController.delete)

personsRouter.patch('/:id', PersonController.update)
*/
