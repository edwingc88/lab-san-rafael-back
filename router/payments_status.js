import { Router } from 'express'

import { PaymentStatuController } from '../controllers/payments_status.js'

// import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createPaymentStatuRouter = ({ paymentStatuModel }) => {
  const paymentsStatusRouter = Router()

  const paymentStatuController = new PaymentStatuController({ paymentStatuModel })

  paymentsStatusRouter.get('/', paymentStatuController.getAll)

  paymentsStatusRouter.get('/:id', paymentStatuController.getById)

  paymentsStatusRouter.post('/', paymentStatuController.create)

  paymentsStatusRouter.patch('/:id', /* [verifyToken, isAdmin], */ paymentStatuController.update)

  paymentsStatusRouter.delete('/:id', paymentStatuController.delete)

  return paymentsStatusRouter
}
