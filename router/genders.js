import { Router } from 'express'

import { GenderController } from '../controllers/genders.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createGenderRouter = ({ genderModel }) => {
  const gendersRouter = Router()

  const genderController = new GenderController({ genderModel })

  gendersRouter.get('/', genderController.getAll)

  gendersRouter.get('/:id', genderController.getById)

  gendersRouter.post('/', genderController.create)

  gendersRouter.patch('/:id', [verifyToken, isAdmin], genderController.update)

  gendersRouter.delete('/:id', genderController.delete)

  return gendersRouter
}
