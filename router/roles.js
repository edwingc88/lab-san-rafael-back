import { Router } from 'express'
import { verifyToken /* , isSuperAdmin  */ } from '../middlewares/authjwt.js'
// import { checkRolesExisted } from '../middlewares/verifysignup.js'

import { RoleController } from '../controllers/roles.js'

export const createRoleRouter = ({ roleModel }) => {
  const rolesRouter = Router()

  const roleController = new RoleController({ roleModel })

  rolesRouter.get('/', [verifyToken], roleController.getAll)

  rolesRouter.get('/:id', [verifyToken], roleController.getById)

  rolesRouter.post('/', [verifyToken], roleController.create)

  rolesRouter.patch('/:id', [verifyToken], roleController.update)

  rolesRouter.delete('/:id', [verifyToken], roleController.delete)

  return rolesRouter
}
