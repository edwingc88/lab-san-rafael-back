import { Router } from 'express'

import { AuthController } from '../controllers/auth.js'
import { checkDuplicatedEmail } from '../middlewares/verifysignup.js'

export const createAuthRouter = ({ authModel }) => {
  const authsRouter = Router()
  const authController = new AuthController({ authModel })
  authsRouter.post('/signup', [checkDuplicatedEmail], authController.signUp)
  authsRouter.post('/signin', authController.signIn)
  return authsRouter
}
