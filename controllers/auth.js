import 'dotenv/config'
// import { validatePerson } from '../schemas/clients.js'
import { validateSignup } from '../schemas/signup.js'
import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'  // Habilitar para encryptar
import multiparty from 'multiparty'

export class AuthController {
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  signUp = async (req, res, next) => {
    // console.log(req.body)
    const form = new multiparty.Form()
    try {
      form.parse(req, async (err, fields) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })

        console.log(JSON.stringify(fields, null, 1))
        console.log('mostrando arriba fileds')

        //  Transformando los datos que vienen de Fields , quitando los [] que vienen en cada valor, para luego validarlos.
        const dataObjectFields = { firstname: fields.firstname[0], lastname: fields.lastname[0], username: fields.username[0], password: fields.password[0], email: fields.email[0], firstphone: fields.firstphone[0], created: fields.created[0], birthdate: fields.birthdate[0]/* id_role: idRoleParce, id_gender: idGender, id_relationship: idRelationShip */ }

        const result = validateSignup(dataObjectFields)

        console.log(result)

        if (result.error) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newAuth = await this.authModel.createClient({ input: result.data })

        res.status(201).json(newAuth)
      })
    } catch (error) {
      next(error)
    }

    /// ****///
    // const result = validateSignup(req.body)

    // Validar si ya existe para no crear dos clientas con el mismo username

    // const newAuth = await this.authModel.create({ input: result.data })

    // Habilitar si queremos que cree un token al registrarse
    /* const token = jwt.sign({ id: newAuth[0].id }, process.env.SECRET, {
      expiresIn: 240// 24h
    }) */

    // console.log(newAuth[0].username)
    // res.status(201).json({ token })
  }

  signIn = async (req, res, next) => {
    try {
      const form = new multiparty.Form()

      form.parse(req, async (err, fields) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'Error msj formdata' })
        }

        const dataObject = { username: fields.username[0], password: fields.password[0] }

        console.log(dataObject)
        console.log('Data object arriba')

        console.log(dataObject.username)

        const findUserByUsername = await this.authModel.findByUsername(dataObject.username)

        console.log(findUserByUsername)
        // passwod con escriptacion
        // const passwordIsValid = findUserByUsername === null ? false : await bcrypt.compare(dataObject.password, findUserByUsername[0].client_password)

        const passwordIsValid = findUserByUsername === null ? false : dataObject.password === findUserByUsername[0].client_password

        if (!passwordIsValid) {
          return res.status(404).json({ error: ' Your username and password are not correct. Try again' })
        }

        const clientId = findUserByUsername[0].client_id
        const roleId = findUserByUsername[0].client_id_role

        const token = jwt.sign({ client: [clientId, roleId] }, process.env.SECRET, { expiresIn: 3600 })

        console.log('ID ARRIBA')
        return res.status(200).json({ id_client: clientId, id_role: roleId, token })
        // return res.status(200).json({ dataObject })
      })
    } catch (error) {
      next(error)
    }
  }
}
