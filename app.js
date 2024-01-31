import express, { json } from 'express'
import cors from 'cors'
import { notFound, errorHandler } from './middlewares/errors.js'

import { createExamRouter } from './router/exams.js'
import { createUserRouter } from './router/users.js'
import { createRoleRouter } from './router/roles.js'
import { createLabRouter } from './router/labs.js'
import { createPatientRouter } from './router/patients.js'
import { createSourceRouter } from './router/sources.js'
import { createCategoryRouter } from './router/categorys.js'
import { createResultRouter } from './router/results.js'
import { createExamCategoryRouter } from './router/exams_categorys.js'
import { createSubCategoryRouter } from './router/subcategorys.js'
import { createCompousedRouter } from './router/compouseds.js'
import { createInvoiceRouter } from './router/invoices.js'
import { createInvoiceExamRouter } from './router/invoices_exams.js'
import { createRelationshipRouter } from './router/relationships.js'
import { createAuthRouter } from './router/auth.js'
import { createGenderRouter } from './router/genders.js'

// Cors
// import { corsMiddleware } from './middlewares/cors.js'
// jswt
// import pkg from './package.json' assert { type: 'json' }
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
// const MIMETYPES = ['image/jpeg', 'image/png', 'application/msword', 'application/pdf'];

const pkg = JSON.parse(readFileSync('./package.json'))

export const createApp = ({ relationshipModel, genderModel, userModel, roleModel, patientModel, labModel, invoiceModel, invoiceExamModel, examModel, examCategoryModel, compousedModel, resultModel, categoryModel, subcategoryModel, authModel }) => {
  const app = express()
  app.set('pkg', pkg)
  app.use(json())
  app.use(cors())
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
  })
  // app.use(corsMiddleware())
  // app.use(express.static(join(__dirname, './public')))
  app.disable('x-powered-by')
  /* app.get('/', (req, res) => {
    res.json({
      name: app.get('pkg').name,
      author: app.get('pkg').author,
      description: app.get('pkg').description,
      version: app.get('pkg').version
    })
  }) */

  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, './index.html'))
  })
  /* app.get('/public', (req, res) => {
    res.sendFile(join(__dirname, 'public/images/ambulatorio.png'))
  }) */
  app.use('/sources', createSourceRouter())
  app.use('/users', createUserRouter({ userModel }))
  app.use('/roles', createRoleRouter({ roleModel }))
  app.use('/auth', createAuthRouter({ authModel }))
  app.use('/exams', createExamRouter({ examModel }))
  app.use('/exam_category', createExamCategoryRouter({ examCategoryModel }))
  app.use('/invoices_exams', createInvoiceExamRouter({ invoiceExamModel }))
  app.use('/invoices', createInvoiceRouter({ invoiceModel }))
  app.use('/compoused', createCompousedRouter({ compousedModel }))
  app.use('/results', createResultRouter({ resultModel }))
  app.use('/categorys', createCategoryRouter({ categoryModel }))
  app.use('/subcategorys', createSubCategoryRouter({ subcategoryModel }))
  app.use('/labs', createLabRouter({ labModel }))
  app.use('/patients', createPatientRouter({ patientModel }))
  app.use('/relationships', createRelationshipRouter({ relationshipModel }))
  app.use('/genders', createGenderRouter({ genderModel }))

  /* app.use((req, res) => {
    res.status(404).json({ error: 'Error 404 not found' })
  }) */

  app.use(notFound)
  app.use(errorHandler)

  const PORT = process.env.PORT ?? 1234
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
}
