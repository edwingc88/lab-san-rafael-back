import { AuthModel } from '../models/postgres/laboratory.js'

export const checkDuplicatedEmail = async (req, res, next) => {
  // console.log(req.body.email)
  // console.log('midelware arriba req.body.roles')
  const user = await AuthModel.find(req.body.email)
  console.log(user)
  console.log('Arriba email duplicado')
  if (user === 0) return res.status(401).json({ message: 'Email Duplicado' })
  next()
}

export const checkRolesExisted = (req, res, next) => {
  console.log(req.body.roles)
  console.log('midelware arriba req.body.roles')
  next()
}
