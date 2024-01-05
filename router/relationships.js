import { Router } from 'express'

import { RelationshipController } from '../controllers/relationships.js'

import { verifyToken, isAdmin } from '../middlewares/authjwt.js'

export const createRelationshipRouter = ({ relationshipModel }) => {
  const relationshipsRouter = Router()

  const relationshipController = new RelationshipController({ relationshipModel })

  relationshipsRouter.get('/', relationshipController.getAll)

  relationshipsRouter.get('/:category_id', [verifyToken], relationshipController.getById)

  relationshipsRouter.post('/', relationshipController.create)

  relationshipsRouter.patch('/:id', [verifyToken, isAdmin], relationshipController.update)

  relationshipsRouter.delete('/:id', [verifyToken, isAdmin], relationshipController.delete)

  return relationshipsRouter
}
