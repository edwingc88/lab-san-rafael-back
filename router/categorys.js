import { Router } from 'express'

import { CategoryController } from '../controllers/categorys.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createCategoryRouter = ({ categoryModel }) => {
  const categorysRouter = Router()

  const categoryController = new CategoryController({ categoryModel })

  categorysRouter.get('/', categoryController.getAll)

  categorysRouter.get('/:id', [verifyToken], categoryController.getById)

  categorysRouter.post('/', categoryController.create)

  categorysRouter.patch('/:id', [verifyToken, isAdmin], categoryController.update)

  categorysRouter.delete('/:id', [verifyToken, isAdmin], categoryController.delete)

  return categorysRouter
}
