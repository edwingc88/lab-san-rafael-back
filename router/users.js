import { Router } from 'express'

import { UserController } from '../controllers/users.js'

// import { verifyToken /* isAdmin */ } from '../middlewares/authjwt.js'

export const createUserRouter = ({ userModel }) => {
  const usersRouter = Router()

  const userController = new UserController({ userModel })

  usersRouter.get('/', userController.getAll)

  usersRouter.get('/:id', userController.getById)

  usersRouter.post('/', userController.create)

  usersRouter.patch('/:id'/*, [verifyToken, isAdmin] */, userController.update)
  usersRouter.patch('/updateimg/:id', userController.updateImg)
  usersRouter.delete('/:id', userController.delete)
  usersRouter.delete('/deleteimg/:id', userController.deleteImg)

  return usersRouter
}
