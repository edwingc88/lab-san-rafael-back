import { Router } from 'express'

import { OrderStatuController } from '../controllers/orders_status.js'

// import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createOrderStatuRouter = ({ orderStatuModel }) => {
  const ordersStatusRouter = Router()

  const orderStatuController = new OrderStatuController({ orderStatuModel })

  ordersStatusRouter.get('/', orderStatuController.getAll)

  ordersStatusRouter.get('/:id', orderStatuController.getById)

  ordersStatusRouter.post('/', orderStatuController.create)

  ordersStatusRouter.patch('/:id', /* [verifyToken, isAdmin], */ orderStatuController.update)

  ordersStatusRouter.delete('/:id', orderStatuController.delete)

  return ordersStatusRouter
}
