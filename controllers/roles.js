import { validateRole, validatePartialRole } from '../schemas/roles.js'
import multiparty from 'multiparty'

export class RoleController {
  constructor ({ roleModel }) {
    this.roleModel = roleModel
  }

  getAll = async (req, res, next) => {
    try {
      const roles = await this.roleModel.getAll()
      if (roles.length === 0) return res.status(404).json({ error: 'Not content. Empty database' })
      return res.status(201).json(roles)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const roles = await this.roleModel.getById(id)
      if (roles.length === 0) return res.status(404).json({ error: 'Not content. Empty database' })
      // res.status(404).json({ error: 'Not found roles' })
      return res.status(201).json(roles)
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      const form = new multiparty.Form()
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })

        let newvalue = {}

        const claves = Object.keys(fields)

        for (let i = 0; i < claves.length; i++) {
          const clave = claves[i]
          const valor = { [clave]: fields[clave][0] }
          newvalue = { ...newvalue, ...valor }
        }

        /**  Validar Datos con Zot **/
        const resultZot = validateRole(newvalue)

        if (resultZot.error) {
          return res.status(400).json({ error: JSON.parse(resultZot.error) })
        }
        console.log('Zot : ', resultZot.data)

        /**  Registrar en Base de Datos **/
        const newUserResult = await this.roleModel.create({ input: resultZot.data })
        return res.status(201).json(newUserResult)

        /*     const result = validateRole(req.body)
        const newroles = await this.roleModel.create({ input: result.data })
        if (newroles.length === 0) return res.status(400).json({ Error: 'Empty' })
        return res.status(201).json(newroles) */
      })
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res, next) => {
    try {
      const form = new multiparty.Form()
      const { id } = req.params
      console.log('id aqui en controller es:', id)
      form.parse(req, async (err, fields) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'Error msj formdata Update' })
        }

        /// RECUPERANDO DATOS ITERANDO OBJETO
        const claves = Object.keys(fields)
        let newvalue = {}

        for (let i = 0; i < claves.length; i++) {
          const clave = claves[i]
          const valor = { [clave]: fields[clave][0] }
          newvalue = { ...newvalue, ...valor }
        }

        const result = validatePartialRole(newvalue)

        if (result.error) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const updatedRoleResult = await this.roleModel.update({ idupdate: id, input: result.data })

        /*    if (updatedlabResult.length === 0) res.status(404).json({ error: 'Not found lab' }) */

        return res.status(201).json(updatedRoleResult)
      })

      /*       const result = validatePartialRole(req.body)
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const { id } = req.params
      console.log(id)
      const updatedroles = await this.roleModel.update({ id, input: result.data })
      if (!updatedroles || updatedroles.length === 0) return res.status(404).json({ error: 'Not found roles' })
      return res.json(updatedroles) */
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.roleModel.delete({ id })
      if (result.length === 0) return res.status(404).json({ error: 'Not found roles' })
      return res.status(201).json({ message: 'roles deleted' })
    } catch (error) {
      next(error)
    }
  }
}
