import 'dotenv/config'
// import { validatePerson } from '../schemas/clients.js'

import { validateSignup } from '../schemas/signup.js'
import jwt from 'jsonwebtoken'
import bc from 'bcrypt'
import multiparty from 'multiparty'

export class AuthController {
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  signUp = async (req, res) => {
    // console.log(req.body)

    const form = new multiparty.Form()

    form.parse(req, async (err, fields) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Error msj formdata' })
      }
      console.log(JSON.stringify(fields, null, 1))
      console.log('mostrando arriba fileds')

      const idRoleParce = parseInt(fields.id_role[0], 10)

      const dataObject = { firstname: fields.firstname[0], lastname: fields.lastname[0], email: fields.email[0], password: fields.password[0], mobilephone: fields.mobilephone[0], dni: fields.dni[0], created: fields.created[0], id_role: idRoleParce }

      console.log(dataObject)
      console.log('Data object arriba')

      const result = validateSignup(dataObject)

      console.log(result)

      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const newAuth = await this.authModel.create({ input: result.data })

      res.status(201).json(newAuth)
    })

    /// ****///
    // const result = validateSignup(req.body)

    // Validar si ya existe para no crear dos clientas con el mismo email

    // const newAuth = await this.authModel.create({ input: result.data })

    // Habilitar si queremos que cree un token al registrarse
    /* const token = jwt.sign({ id: newAuth[0].id }, process.env.SECRET, {
      expiresIn: 240// 24h
    }) */

    // console.log(newAuth[0].email)
    // res.status(201).json({ token })
  }

  signIn = async (req, res) => {
    const form = new multiparty.Form()

    console.log('ENTRO EN SIGNN')

    form.parse(req, async (err, fields) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Error msj formdata' })
      }

      const dataObject = { email: fields.email[0], password: fields.password[0] }

      console.log(dataObject)
      console.log('Data object arriba')

      console.log(dataObject.email)

      const findUserByEmail = await this.authModel.find(dataObject.email)

      console.log(findUserByEmail)

      const passwordIsValid = findUserByEmail === null ? false : await bc.compare(dataObject.password, findUserByEmail[0].password)

      if (!passwordIsValid) {
        return res.status(404).json({ error: 'Not found ID por PASSWORD' })
      }

      const clientId = findUserByEmail[0].id
      const roleId = findUserByEmail[0].id_role

      const token = jwt.sign({ client: [clientId, roleId] }, process.env.SECRET, { expiresIn: 840 })

      console.log('ID ARRIBA')
      return res.status(200).json({ id_client: clientId, id_role: roleId, token })
      // return res.status(200).json({ dataObject })
    })
  }

  // const { email, password } = req.body
  // console.log(email)

  // const findUserByEmail = await this.authModel.find(email)

  /* if (findUserByEmail.length === 0) {
      return res.status(404).json({ error: 'Not found ID por EMAIL' })
    } */

  /* const passwordIsValid = findUserByEmail === null ? false : await bc.compare(password, findUserByEmail[0].password)

    if (!passwordIsValid) {
      return res.status(404).json({ error: 'Not found ID por PASSWORD' })
    }

    const clientId = findUserByEmail[0].id
    const roleId = findUserByEmail[0].id_role

    const token = jwt.sign({ client: [clientId, roleId] }, process.env.SECRET, { expiresIn: 840 }) */

  // console.log(findIDEmail[0])
  // console.log('ID ARRIBA')
  /*   return res.status(200).json({ id_client: clientId, id_role: roleId, token })
  } */
}
