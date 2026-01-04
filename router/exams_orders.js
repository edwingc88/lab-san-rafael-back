import { Router } from 'express'

import { ExamOrderResultController } from '../controllers/exams_orders.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createExamOrderResultRouter = ({ examOrderResultModel }) => {
  const examOrderResultsRouter = Router()

  const examOrderResultController = new ExamOrderResultController({ examOrderResultModel })

  examOrderResultsRouter.get('/', examOrderResultController.getAll)

  examOrderResultsRouter.get('/:id', [verifyToken], examOrderResultController.getById)

  examOrderResultsRouter.post('/', examOrderResultController.create)

  examOrderResultsRouter.patch('/:id', [verifyToken, isAdmin], examOrderResultController.update)

  examOrderResultsRouter.delete('/:id', [verifyToken, isAdmin], examOrderResultController.delete)

  examOrderResultsRouter.delete('/order/:idOrder/exam/:idExam', examOrderResultController.deleteExam)

  return examOrderResultsRouter
}
