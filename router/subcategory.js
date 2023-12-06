import { Router } from 'express'

import { SubCategoryController } from '../controllers/subcategorys.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createSubCategoryRouter = ({ subcategoryModel }) => {
  const subcategorysRouter = Router()

  const subcategoryController = new SubCategoryController({ subcategoryModel })

  subcategorysRouter.get('/', subcategoryController.getAll)

  subcategorysRouter.get('/:id', [verifyToken], subcategoryController.getById)

  subcategorysRouter.post('/', subcategoryController.create)

  subcategorysRouter.patch('/:id', [verifyToken, isAdmin], subcategoryController.update)

  subcategorysRouter.delete('/:id', [verifyToken, isAdmin], subcategoryController.delete)

  return subcategorysRouter
}
