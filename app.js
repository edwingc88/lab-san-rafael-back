import express, { json } from 'express'
import { createExamRouter } from './router/exams.js'
import { createClientRouter } from './router/clients.js'
import { createRoleRouter } from './router/roles.js'
import { createLabRouter } from './router/lab.js'
import { createPatientRouter } from './router/patients.js'
import { createSourceRouter } from './router/sources.js'

// Cors
import { corsMiddleware } from './middlewares/cors.js'

// jswt
import { createAuthRouter } from './router/auth.js'

// import pkg from './package.json' assert { type: 'json' }
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
// const MIMETYPES = ['image/jpeg', 'image/png', 'application/msword', 'application/pdf'];

const pkg = JSON.parse(readFileSync('./package.json'))

export const createApp = ({ clientModel, roleModel, patientModel, labModel, examModel, authModel }) => {
  const app = express()
  app.set('pkg', pkg)
  app.use(json())
  app.use(corsMiddleware())
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
  app.use('/clients', createClientRouter({ clientModel }))
  app.use('/roles', createRoleRouter({ roleModel }))
  app.use('/auth', createAuthRouter({ authModel }))
  app.use('/exams', createExamRouter({ examModel }))
  app.use('/lab', createLabRouter({ labModel }))
  app.use('/patients', createPatientRouter({ patientModel }))

  app.use((req, res) => {
    res.status(404).json({ error: 'Error 404 not found' })
  })

  const PORT = process.env.PORT ?? 1234
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
}
