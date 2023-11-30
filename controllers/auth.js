import 'dotenv/config'
import { validatePerson } from '../schemas/persons.js'
import jwt from 'jsonwebtoken'
import bc from 'bcrypt'

export class AuthController {
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  signUp = async (req, res) => {
    const result = validatePerson(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    // Validar si ya existe para no crear dos personas con el mismo email

    const newAuth = await this.authModel.create({ input: result.data })

    const token = jwt.sign({ id: newAuth[0].id }, process.env.SECRET, {
      expiresIn: 240// 24h
    })

    // console.log(newAuth[0].email)
    res.status(201).json({ token })
  }

  signIn = async (req, res) => {
    const { email, password } = req.body
    // console.log(email)

    const findUserByEmail = await this.authModel.find({ email })

    if (findUserByEmail.length === 0) {
      return res.status(404).json({ error: 'Not found ID por EMAIL' })
    }

    const passwordIsValid = findUserByEmail === null ? false : await bc.compare(password, findUserByEmail[0].password)

    if (!passwordIsValid) {
      return res.status(404).json({ error: 'Not found ID por PASSWORD' })
    }

    const personId = findUserByEmail[0].id
    const roleId = findUserByEmail[0].role_id

    const token = jwt.sign({ person: [personId, roleId] }, process.env.SECRET, { expiresIn: 840 })

    // console.log(findIDEmail[0])
    // console.log('ID ARRIBA')
    return res.status(200).json({ id_person: personId, id_role: roleId, token })
  }

  logOut = async (req, res) => {
    /*
    const { token } = req.body
    console.log(token)
   */
  }
}
