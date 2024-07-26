import { Router } from 'express'

import { OrderController } from '../controllers/orders.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createOrderRouter = ({ orderModel }) => {
  const ordersRouter = Router()

  const orderController = new OrderController({ orderModel })

  ordersRouter.get('/', orderController.getAll)

  ordersRouter.get('/:id', [verifyToken], orderController.getById)

  ordersRouter.post('/', orderController.create)

  ordersRouter.patch('/:id', [verifyToken, isAdmin], orderController.update)

  ordersRouter.delete('/:id', [verifyToken, isAdmin], orderController.delete)

  return ordersRouter
}
