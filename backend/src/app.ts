import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { router } from './routes'

export const createApp = () => {
  const app = express()

  app.use(
    cors({
      origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        process.env.FRONTEND_ORIGIN ?? '',
      ].filter(Boolean),
      credentials: true,
    })
  )

  app.use(helmet())
  app.use(express.json())
  app.use(morgan(env.useMockData ? 'tiny' : 'dev'))

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.use(router)

  app.use(errorHandler)

  return app
}
