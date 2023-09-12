import cors from 'cors'
export const corsMiddleware = () => cors({
  origin: (origin, callback) => {
    const ACEEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'http://movies.com'
    ]

    if (ACEEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
