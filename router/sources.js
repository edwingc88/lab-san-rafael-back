import { Router } from 'express'
// import { verifyToken } from '../middlewares/authjwt.js'
import { SourceController } from '../controllers/sources.js'

export const createSourceRouter = () => {
  const sourceRouter = Router()

  const sourceController = new SourceController()

  // sourceRouter.get('/', sourceController.getAll)

  sourceRouter.get('/images/:id', sourceController.getByIdImg)
  sourceRouter.get('/images/public/:id', sourceController.getByIdImgPublic)
  sourceRouter.get('/pdf/:id', sourceController.getByIdPdf)

  // sourceRouter.post('/', sourceController.create)

  // sourceRouter.patch('/:id', sourceController.update)

  sourceRouter.delete('/:id', sourceController.delete)

  return sourceRouter
}
