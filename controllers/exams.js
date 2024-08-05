import { validateExam, validatePartialExam } from '../schemas/exams.js'
import multiparty from 'multiparty'

export class ExamController {
  constructor ({ examModel }) {
    this.examModel = examModel
  }

  getAll = async (req, res, next) => {
    try {
      const { _category } = req.query
      // console.log(_category)

      const exams = await this.examModel.getAll({ _category })
      if (exams.length === 0 || exams.length == null || exams.length === undefined) return res.status(201).json({ msj: 'Empty  exams' })
      res.json(exams)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    const { id } = req.params
    const result = await this.examModel.getById(id)
    if (!result.length) return res.status(404).json({ error: 'Not content. Empty database' })
    return res.status(201).json(result)
  }

  /*   create = async (req, res) => {
    const result = validateExam(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newexam = await this.examModel.create({ input: result.data })

    res.status(201).json(newexam)
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
        const resultZod = validateExam(newvalue)

        if (resultZod.error) {
          return res.status(400).json({ error: JSON.parse(resultZod.error) })
        }
        console.log('Zot : ', resultZod.data)

        /**  Registrar en Base de Datos **/
        const newUserResult = await this.examModel.create({ input: resultZod.data })
        return res.status(201).json(newUserResult)
      })
    } catch (error) {
      next(error)
    }
  }

  /*   update = async (req, res) => {
    console('Iniciando update en controllers')
    const result = validatePartialExam(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedexam = await this.examModel.update({ id, input: result.data })
    if (!updatedexam) return res.status(404).json({ error: 'Not found exam' })
    return res.json(updatedexam)
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

        const result = validatePartialExam(newvalue)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const updateduser = await this.examModel.update({ id, input: result.data })
        /*
        if (updateduser.length === 0) return res.status(404).json({ error: 'Not found Exam en Controllers' }) */

        return res.status(201).json(updateduser)
      })
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await this.examModel.delete({ id })
      if (result === false) return res.status(404).json({ error: 'Not found exam' })
      return res.json({ message: 'exam deleted' })
    } catch (error) {
      next(error)
    }
  }
}
