import { Router } from 'express'

import { ClientController } from '../controllers/clients.js'

// import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createClientRouter = ({ clientModel }) => {
  const clientsRouter = Router()

  const clientController = new ClientController({ clientModel })

  clientsRouter.get('/', clientController.getAll)

  clientsRouter.get('/:id', clientController.getById)

  clientsRouter.post('/', clientController.create)

  clientsRouter.patch('/:id'/*, [verifyToken, isAdmin] */, clientController.update)
  clientsRouter.patch('/updateimg/:id', clientController.updateImg)
  clientsRouter.delete('/:id', clientController.delete)

  clientsRouter.delete('/deleteimg/:id', clientController.deleteImg)

  return clientsRouter
}
