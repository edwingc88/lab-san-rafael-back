import { Router } from 'express'

import { AuthController } from '../controllers/auth.js'

export const createAuthRouter = ({ authModel }) => {
  const authsRouter = Router()
  const authController = new AuthController({ authModel })
  authsRouter.post('/signup', authController.signUp)
  authsRouter.post('/signin', authController.signIn)
  authsRouter.post('/logout', authController.logOut)
  return authsRouter
}
