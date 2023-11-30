import express, { json } from 'express'
// import { moviesRouter } from './router/movies.js'
import { createPersonRouter } from './router/persons.js'
import { createRoleRouter } from './router/roles.js'
import { corsMiddleware } from './middlewares/cors.js'

// jswt
import { createAuthRouter } from './router/auth.js'

// import pkg from './package.json' assert { type: 'json' }
import { readFileSync } from 'fs'
const pkg = JSON.parse(readFileSync('./package.json'))

export const createApp = ({ personModel, roleModel, authModel }) => {
  const app = express()
  app.set('pkg', pkg)
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  app.get('/', (req, res) => {
    res.json({
      name: app.get('pkg').name,
      author: app.get('pkg').author,
      description: app.get('pkg').description,
      version: app.get('pkg').version
    })
  })
  // app.use('/movies', moviesRouter)
  app.use('/persons', createPersonRouter({ personModel }))
  app.use('/roles', createRoleRouter({ roleModel }))
  app.use('/auth', createAuthRouter({ authModel }))
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  const PORT = process.env.PORT ?? 1234
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
}
