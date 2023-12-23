import { validateResult, validatePartialResult } from '../schemas/results.js'

export class ResultController {
  constructor ({ resultModel }) {
    this.resultModel = resultModel
  }

  getAll = async (req, res) => {
    const { _category } = req.query
    // console.log(_category)

    const results = await this.resultModel.getAll({ _category })
    if (results.length === 0) return res.status(404).json({ msj: 'Empty  results' })
    res.json(results)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const result = await this.resultModel.getById(id)
    console.log(result)
    if (result) return res.json(result)
    res.status(404).json({ error: 'Not found result' })
  }

  create = async (req, res) => {
    const result = validateResult(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newresult = await this.resultModel.create({ input: result.data })

    res.status(201).json(newresult)
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
