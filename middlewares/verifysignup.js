// import { AuthModel } from '../models/postgres/laboratory.js'

export const checkDuplicatedUsernameOrEmail = async (req, res, next) => {

}

export const checkRolesExisted = (req, res, next) => {
  console.log(req.body.roles)
  console.log('midelware arriba req.body.roles')

  next()
}
