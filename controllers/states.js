import { validateState, validatePartialState } from '../schemas/states.js'
import multiparty from 'multiparty'

export class StateController {
  constructor ({ stateModel }) {
    this.stateModel = stateModel
  }

  getAll = async (req, res, next) => {
    try {
      const states = await this.stateModel.getAll()
      if (states.length === 0) return res.status(404).json({ msj: 'Empty  states' })
      return res.status(201).json(states)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const states = await this.stateModel.getById(id)
      if (states.length === 0) return res.status(404).json({ error: 'Not found state' })
      return res.status(201).json(states) // 200 = OK, 201 = Created, 204 = No content, 400 = Bad request, 401 = Unauthorized, 403 = Forbidden, 404 = Not found, 500 = Internal server error, 503 = Service unavailable
    } catch (error) {
      next(error)
    }
  }

  /*   create = async (req, res) => {
    const result = validateState(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newstate = await this.stateModel.create({ input: result.data })

    res.status(201).json(newstate)
  }
 */
  create = async (req, res, next) => {
    try {
      const form = new multiparty.Form()
      form.parse(req, async (err, fields) => {
        if (err) return res.status(500).json({ error: 'Error msj formdata' })

        let newvalue = {}

        const claves = Object.keys(fields)

        for (let i = 0; i < claves.length; i++) {
          const clave = claves[i]
          const valor = { [clave]: fields[clave][0] }
          newvalue = { ...newvalue, ...valor }
        }

        /**  Validar Datos con Zot **/
        const resultZod = validateState(newvalue)

        if (resultZod.error) {
          return res.status(400).json({ error: JSON.parse(resultZod.error) })
        }
        console.log('Zot : ', resultZod.data)

        /**  Registrar en Base de Datos **/
        const newUserResult = await this.stateModel.create({ input: resultZod.data })
        return res.status(201).json(newUserResult)
      })
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res) => {
    const result = validatePartialState(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedstate = await this.stateModell.update({ id, input: result.data })
    if (!updatedstate) return res.status(404).json({ error: 'Not found state' })
    return res.json(updatedstate)
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.stateModel.delete({ id })
      if (result.length === 0) return res.status(404).json({ error: 'Not found state' })
      return res.status(201).json({ message: 'state deleted' })
    } catch (error) {
      next(error)
    }
  }
}
