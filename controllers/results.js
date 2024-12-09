import { validateResult, validatePartialResult } from '../schemas/results.js'
import multiparty from 'multiparty'

export class ResultController {
  constructor ({ resultModel }) {
    this.resultModel = resultModel
  }

  getAll = async (req, res, next) => {
  /*     const { _category } = req.query
     console.log(_category)

    const results = await this.resultModel.getAll({ _category })
    if (results.length === 0) return res.status(404).json({ msj: 'Empty  results' })
    res.json(results)
 */

    try {
      const results = await this.resultModel.getAll()
      if (results.length === 0) return res.status(404).json({ msj: 'Empty  results' })
      return res.status(201).json(results)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res) => {
    const { id } = req.params
    const result = await this.resultModel.getById(id)
    console.log(result)
    if (result) return res.json(result)
    res.status(404).json({ error: 'Not found result' })
  }

  create = async (req, res) => {
    const form = new multiparty.Form()

    form.parse(req, async (err, fields) => {
      if (err) return res.status(500).json({ error: 'Error msj formdata' })

      /** RECUPERANDO DATOS ITERANDO OBJETO **/
      let newvalue = {}

      const claves = Object.keys(fields)

      for (let i = 0; i < claves.length; i++) {
        const clave = claves[i]
        const valor = { [clave]: fields[clave][0] }
        newvalue = { ...newvalue, ...valor }
      }

      /**  Validar Datos con Zot **/
      const resultZod = validateResult(newvalue)

      if (resultZod.error) {
        return res.status(400).json({ error: JSON.parse(resultZod.error) })
      }
      console.log(resultZod.data)

      /**  Registrar en Base de Datos **/
      const newResult = await this.resultModel.create({ input: resultZod.data })
      res.status(201).json(newResult)
    })
  }

  update = async (req, res) => {
    const result = validatePartialResult(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedresult = await this.resultModell.update({ id, input: result.data })
    if (!updatedresult) return res.status(404).json({ error: 'Not found result' })
    return res.json(updatedresult)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.resultModel.delete({ id })
    if (result === false) return res.status(404).json({ error: 'Not found result' })
    return res.json({ message: 'result deleted' })
  }
}
