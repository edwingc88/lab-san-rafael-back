import { Router } from 'express'

import { PaymentStatuController } from '../controllers/payments_status.js'

// import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createPaymentStatuRouter = ({ paymentStateModel }) => {
  const paymentsStatusRouter = Router()

  const paymentsStateController = new PaymentStatuController({ paymentStateModel })

  paymentsStatusRouter.get('/', paymentsStateController.getAll)

  paymentsStatusRouter.get('/:id', paymentsStateController.getById)

  paymentsStatusRouter.post('/', paymentsStateController.create)

  paymentsStatusRouter.patch('/:id', /* [verifyToken, isAdmin], */ paymentsStateController.update)

  paymentsStatusRouter.delete('/:id', paymentsStateController.delete)

  return paymentsStatusRouter
}
