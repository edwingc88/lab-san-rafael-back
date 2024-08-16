import { Router } from 'express'

import { ParameterController } from '../controllers/parameters.js'

import { /* verifyToken, isAdmin */ } from '../middlewares/authjwt.js'

export const createParameterRouter = ({ parameterModel }) => {
  const parametersRouter = Router()

  const parameterController = new ParameterController({ parameterModel })

  parametersRouter.get('/', parameterController.getAll)

  parametersRouter.get('/:id', /* [verifyToken], */ parameterController.getById)

  parametersRouter.post('/', parameterController.create)

  parametersRouter.patch('/:id', /*  [verifyToken, isAdmin], */ parameterController.update)

  parametersRouter.delete('/:id', /*  [verifyToken, isAdmin], */ parameterController.delete)

  return parametersRouter
}
