import { Router } from 'express'

import { ClientController } from '../controllers/clients.js'

import { verifyToken /* isAdmin */ } from '../middlewares/authjwt.js'

export const createClientRouter = ({ clientModel }) => {
  const clientsRouter = Router()

  const clientController = new ClientController({ clientModel })

  clientsRouter.get('/', [verifyToken], clientController.getAll)

  clientsRouter.get('/:id', [verifyToken], clientController.getById)

  clientsRouter.post('/', [verifyToken], clientController.create)

  clientsRouter.patch('/:id'/*, [verifyToken, isAdmin] */, [verifyToken], clientController.update)
  clientsRouter.patch('/updateimg/:id', [verifyToken], clientController.updateImg)
  clientsRouter.delete('/:id', [verifyToken], clientController.delete)

  clientsRouter.delete('/deleteimg/:id', [verifyToken], clientController.deleteImg)

  return clientsRouter
}
