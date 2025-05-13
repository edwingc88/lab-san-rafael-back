import { validateParameter, validatePartialParameter } from '../schemas/parameters.js'
import multiparty from 'multiparty'

export class ParameterController {
  constructor ({ parameterModel }) {
    this.parameterModel = parameterModel
  }

  getAll = async (req, res, next) => {
    try {
      const { idExam } = req.query
      console.log('Id del examen ', idExam)
      const parameters = await this.parameterModel.getAll({ idExam })
      if (parameters.length === 0 || parameters.length == null || parameters.length === undefined) return res.status(201).json({ msj: 'Empty  parameters' })
      res.json(parameters)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    const { id } = req.params
    const result = await this.parameterModel.getById(id)
    if (!result.length) return res.status(404).json({ error: 'Not content. Empty database' })
    return res.status(201).json(result)
  }

  /*   create = async (req, res) => {
    const result = validateParameter(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newparameter = await this.parameterModel.create({ input: result.data })

    res.status(201).json(newparameter)
  } */

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
        const resultZod = validateParameter(newvalue)

        if (resultZod.error) {
          return res.status(400).json({ error: JSON.parse(resultZod.error) })
        }
        console.log('Zot : ', resultZod.data)

        /**  Registrar en Base de Datos **/
        const newUserResult = await this.parameterModel.create({ input: resultZod.data })
        return res.status(201).json(newUserResult)
      })
    } catch (error) {
      next(error)
    }
  }

  /*   update = async (req, res) => {
    console('Iniciando update en controllers')
    const result = validatePartialParameter(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedparameter = await this.parameterModel.update({ id, input: result.data })
    if (!updatedparameter) return res.status(404).json({ error: 'Not found parameter' })
    return res.json(updatedparameter)
  }
 */

  update = async (req, res, next) => {
    try {
      console.log('Iniciando update en controllers')
      const { id } = req.params
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

        const result = validatePartialParameter(newvalue)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const updateduser = await this.parameterModel.update({ id, input: result.data })
        /*
        if (updateduser.length === 0) return res.status(404).json({ error: 'Not found Parameter en Controllers' }) */

        return res.status(201).json(updateduser)
      })
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.parameterModel.delete({ id })
      if (result === false) return res.status(404).json({ error: 'Not found parameter' })
      return res.json({ message: 'parameter deleted' })
    } catch (error) {
      next(error)
    }
  }
}
