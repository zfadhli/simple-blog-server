import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { routes } from './routes.js'
import { AppError } from '@lib/app-error.js'
import { globalErrorHandler } from '@middlewares/error-handler.js'

export const app = express()

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/', (req, res) => {
  return res.json({
    status: true,
  })
})
app.use('/api', routes)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler())
