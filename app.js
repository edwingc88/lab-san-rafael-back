import express, { json } from 'express'
import { moviesRouter } from './router/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')
app.get('/', (req, res) => {
  res.send('Hello API')
})
app.use('/movies', moviesRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
