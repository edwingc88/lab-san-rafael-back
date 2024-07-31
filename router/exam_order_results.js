import { Router } from 'express'

import { ExamOrderResultController } from '../controllers/exam_order_results.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createExamOrderResultRouter = ({ examOrderResultModel }) => {
  const examOrderResultsRouter = Router()

  const examOrderResultController = new ExamOrderResultController({ examOrderResultModel })

  examOrderResultsRouter.get('/', examOrderResultController.getAll)

  examOrderResultsRouter.get('/:category_id', [verifyToken], examOrderResultController.getById)

  examOrderResultsRouter.post('/', examOrderResultController.create)

  examOrderResultsRouter.patch('/:id', [verifyToken, isAdmin], examOrderResultController.update)

  examOrderResultsRouter.delete('/:id', [verifyToken, isAdmin], examOrderResultController.delete)

  return examOrderResultsRouter
}
