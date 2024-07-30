import { Router } from 'express'

import { ExamController } from '../controllers/exams.js'

import { /* verifyToken, isAdmin */ } from '../middlewares/authjwt.js'

export const createExamRouter = ({ examModel }) => {
  const examsRouter = Router()

  const examController = new ExamController({ examModel })

  examsRouter.get('/', examController.getAll)

  examsRouter.get('/:id', /* [verifyToken], */ examController.getById)

  examsRouter.post('/', examController.create)

  examsRouter.patch('/:id', /*  [verifyToken, isAdmin], */ examController.update)

  examsRouter.delete('/:id', /*  [verifyToken, isAdmin], */ examController.delete)

  return examsRouter
}
