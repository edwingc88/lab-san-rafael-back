import { Router } from 'express'

import { InvoiceExamController } from '../controllers/invoices_exams.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createInvoiceExamRouter = ({ factureExamModel }) => {
  const factureExamsRouter = Router()

  const factureExamController = new InvoiceExamController({ factureExamModel })

  factureExamsRouter.get('/', factureExamController.getAll)

  factureExamsRouter.get('/:id', [verifyToken], factureExamController.getById)

  factureExamsRouter.post('/', factureExamController.create)

  factureExamsRouter.patch('/:id', [verifyToken, isAdmin], factureExamController.update)

  factureExamsRouter.delete('/:id', [verifyToken, isAdmin], factureExamController.delete)

  return factureExamsRouter
}
