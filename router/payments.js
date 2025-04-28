import { Router } from 'express'

import { PaymentController } from '../controllers/payments.js'

/* import { verifyToken, isAdmin } from '../middlewares/authjwt.js' */

export const createPaymentRouter = ({ paymentModel }) => {
  const paymentsRouter = Router()

  const paymentController = new PaymentController({ paymentModel })

  paymentsRouter.get('/', paymentController.getAll)

  paymentsRouter.get('/:id', /* [verifyToken] , */ paymentController.getById)

  paymentsRouter.post('/', paymentController.create)

  paymentsRouter.patch('/:id', /* [verifyToken, isAdmin],  */paymentController.update)

  paymentsRouter.delete('/:id', /* [verifyToken, isAdmin], */ paymentController.delete)

  return paymentsRouter
}
