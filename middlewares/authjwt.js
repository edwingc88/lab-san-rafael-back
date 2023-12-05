import jwt from 'jsonwebtoken'
import { AuthModel } from '../models/postgres/laboratory.js'

export const verifyToken = async (req, res, next) => {
  try {
    // const token = req.headers['x-access-token']
    const authorization = req.get('authorization')
    let token = null
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.split(' ')[1]
    }
    // const token = req.headers.authorization.split(' ')[1]
    // console.log(token)
    // console.log('verficando')

    if (!token) return res.status(401).json({ message: 'No token provided' })

    const decoded = jwt.verify(token, process.env.SECRET)
    if ((Date.now() / 1000) > decoded.exp) {
      return res.status(401).json({ message: 'Unauthorized verifi TIME OUT' })
    }
    console.log('Decoded Arriba')
    req.userId = decoded.client[0]
    req.userRole = decoded.client[1]

    const findIDEmail = await AuthModel.getByID(req.userId)

    if (!findIDEmail) {
      return res.status(404).json({ error: 'Not found ID por ID' })
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized verifi' })
  }

  next()
}

export const isBionalyst = async (req, res, next) => {
  const user = await AuthModel.getRolByID(req.userId)
  if (user[0].role_id === 3 || user[0].role_id === 1) {
    next()
  }

  return res.status(403).json({ message: 'Require Bionalyst Role!' })
}

export const isAdmin = async (req, res, next) => {
  const user = await AuthModel.getRolByID(req.userId)
  if (user[0].role_id === 2 || user[0].role_id === 1) {
    next()
    return
  }

  return res.status(403).json({ message: 'Require Admin Role!' })
}

export const isSuperAdmin = async (req, res, next) => {
  const user = await AuthModel.getRolByID(req.userId)
  // console.log(user[0].role_id)
  console.log('Middleware isSuperAdmin')
  if (user[0].role_id === 1) {
    next()
    return
  }

  return res.status(403).json({ message: 'Require Super Admin Role!' })
}
