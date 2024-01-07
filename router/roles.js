import { Router } from 'express'

import { verifyToken, isSuperAdmin } from '../middlewares/authjwt.js'
// import { checkRolesExisted } from '../middlewares/verifysignup.js'

import { RoleController } from '../controllers/roles.js'

export const createRoleRouter = ({ roleModel }) => {
  const rolesRouter = Router()

  const roleController = new RoleController({ roleModel })

  rolesRouter.get('/', roleController.getAll)

  rolesRouter.get('/:id', roleController.getById)

  rolesRouter.post('/', roleController.create)

  rolesRouter.patch('/:id', [verifyToken, isSuperAdmin], roleController.update)

  rolesRouter.delete('/:id', roleController.delete)

  return rolesRouter
}
