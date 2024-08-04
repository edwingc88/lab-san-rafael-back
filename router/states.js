import { Router } from 'express'

import { StateController } from '../controllers/states.js'

// import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createStateRouter = ({ stateModel }) => {
  const statesRouter = Router()

  const stateController = new StateController({ stateModel })

  statesRouter.get('/', stateController.getAll)

  statesRouter.get('/:id', stateController.getById)

  statesRouter.post('/', stateController.create)

  statesRouter.patch('/:id', /* [verifyToken, isAdmin], */ stateController.update)

  statesRouter.delete('/:id', stateController.delete)

  return statesRouter
}
