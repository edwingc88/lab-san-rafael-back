import { Router } from 'express'

import { InvoiceController } from '../controllers/invoices.js'

/* import { verifyToken, isAdmin } from '../middlewares/authjwt.js' */

export const createInvoiceRouter = ({ invoiceModel }) => {
  const invoicesRouter = Router()

  const invoiceController = new InvoiceController({ invoiceModel })

  invoicesRouter.get('/', invoiceController.getAll)

  invoicesRouter.get('/:id', /* [verifyToken] , */ invoiceController.getById)

  invoicesRouter.post('/', invoiceController.create)

  invoicesRouter.patch('/:id', /* [verifyToken, isAdmin],  */invoiceController.update)

  invoicesRouter.delete('/:id', /* [verifyToken, isAdmin], */ invoiceController.delete)

  return invoicesRouter
}
