import { Router } from 'express'

import { ReferenceController } from '../controllers/references.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createReferenceRouter = ({ referenceModel }) => {
  const referencesRouter = Router()

  const referenceController = new ReferenceController({ referenceModel })

  referencesRouter.get('/', referenceController.getAll)

  referencesRouter.get('/:id', [verifyToken], referenceController.getById)

  referencesRouter.post('/', referenceController.create)

  referencesRouter.patch('/:id', [verifyToken, isAdmin], referenceController.update)

  referencesRouter.delete('/:id', [verifyToken, isAdmin], referenceController.delete)

  return referencesRouter
}
