import { Router } from 'express'

import { ResultController } from '../controllers/results.js'
/*
import { verifyToken, isAdmin } from '../middlewares/authjwt.js' */

export const createResultRouter = ({ resultModel }) => {
  const resultsRouter = Router()

  const resultController = new ResultController({ resultModel })

  resultsRouter.get('/', resultController.getAll)

  resultsRouter.get('/:id', /* [verifyToken], */ resultController.getById)

  resultsRouter.post('/', resultController.create)

  resultsRouter.patch('/:id', /*  [verifyToken, isAdmin], */ resultController.update)

  resultsRouter.delete('/:id', /*  [verifyToken, isAdmin], */ resultController.delete)

  return resultsRouter
}
