import { Router } from 'express'

import { verifyToken, isSuperAdmin } from '../middlewares/authjwt.js'
import { checkRolesExisted } from '../middlewares/verifysignup.js'

import { RoleController } from '../controllers/roles.js'

export const createRoleRouter = ({ roleModel }) => {
  const rolesRouter = Router()

  const roleController = new RoleController({ roleModel })

  rolesRouter.get('/', [verifyToken, isSuperAdmin], roleController.getAll)

  rolesRouter.get('/:id', [verifyToken, isSuperAdmin], roleController.getById)

  rolesRouter.post('/', [verifyToken, isSuperAdmin, checkRolesExisted], roleController.create)

  rolesRouter.patch('/:id', [verifyToken, isSuperAdmin], roleController.update)

  rolesRouter.delete('/:id', [verifyToken, isSuperAdmin], roleController.delete)

  return rolesRouter
}
