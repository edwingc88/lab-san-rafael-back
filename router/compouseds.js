import { Router } from 'express'

import { CompousedController } from '../controllers/compouseds.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createCompousedRouter = ({ compousedModel }) => {
  const compousedsRouter = Router()

  const compousedController = new CompousedController({ compousedModel })

  compousedsRouter.get('/', compousedController.getAll)

  compousedsRouter.get('/:id', [verifyToken], compousedController.getById)

  compousedsRouter.post('/', compousedController.create)

  compousedsRouter.patch('/:id', [verifyToken, isAdmin], compousedController.update)

  compousedsRouter.delete('/:id', [verifyToken, isAdmin], compousedController.delete)

  return compousedsRouter
}
