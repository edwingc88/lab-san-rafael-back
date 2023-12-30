import { Router } from 'express'

import { ExamCategoryController } from '../controllers/exams_categorys.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createExamCategoryRouter = ({ examCategoryModel }) => {
  const examsCategorysRouter = Router()

  const examCategoryController = new ExamCategoryController({ examCategoryModel })

  examsCategorysRouter.get('/', examCategoryController.getAll)

  examsCategorysRouter.get('/:category_id', [verifyToken], examCategoryController.getById)

  examsCategorysRouter.post('/', examCategoryController.create)

  examsCategorysRouter.patch('/:id', [verifyToken, isAdmin], examCategoryController.update)

  examsCategorysRouter.delete('/:id', [verifyToken, isAdmin], examCategoryController.delete)

  return examsCategorysRouter
}
