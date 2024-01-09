// import { validateClient, validatePartialClient } from '../schemas/clients.js'
import multiparty from 'multiparty'
import { rutaFinal } from '../middlewares/ruta_imagen.js'

export class ClientController {
  constructor ({ clientModel }) {
    this.clientModel = clientModel
  }

  getAll = async (req, res, next) => {
    try {
      const { role } = req.query
      const clients = await this.clientModel.getAll(role)
      if (clients.length === 0) return res.status(404).json({ error: 'Not found client' })
      return res.status(201).json(clients)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const client = await this.clientModel.getById(id)
      if (client.length === 0) return res.status(404).json({ error: 'Not found client' })
      return res.status(201).json(client)
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    // const result = validateClient(req.body)
    // console.log(result)

    const form = new multiparty.Form()
    try {
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })
        /* if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })
        const newclient = await this.clientModel.create({ input: result.data })
        res.status(201).json(newclient) */

        //  Transformando los datos que vienen de Fields , quitando los [] que vienen en cada valor, para luego validarlos.
        const rutaArchivoCompleta = await rutaFinal(files)
        /*  const key = Object.keys(files)[0]
        const rutaLink = files[key][0].path
        const rutaArchivoCompleta = rutaLink.replaceAll('\\', '/') */

        console.log(rutaArchivoCompleta)

        const dataObjectFields = { dni: fields.dni[0], email: fields.email[0], username: fields.username[0], password: fields.password[0], firstname: fields.firstname[0], lastname: fields.lastname[0], firstphone: fields.firstphone[0], secondphone: fields.secondphone[0], birthdate: fields.birthdate[0], bloodtyping: fields.bloodtyping[0], type_relationship: fields.type_relationship[0], created: fields.created[0], id_role: fields.id_role[0] }
        console.log(dataObjectFields)

        // const result = validateClient(dataObjectFields)

        return res.status(201).json(dataObjectFields)
      })
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res) => {
    /* const result = validatePartialClient(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedclient = await this.clientModell.update({ id, input: result.data })
    if (!updatedclient) return res.status(404).json({ error: 'Not found client' })
    return res.json(updatedclient) */
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.clientModel.delete({ id })
      if (result.length === 0) return res.status(404).json({ error: 'Not found client' })
      return res.status(201).json({ message: 'client deleted' })
    } catch (error) {
      next(error)
    }
  }
}
