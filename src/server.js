import 'dotenv/config'
import morgan from 'morgan'
import { app } from './app'
import { logger } from '@lib/logger.js'

if (import.meta.env.DEV) {
  app.use(morgan('dev'))
}

if (import.meta.env.PROD) {
  app.listen(4000, () => {
    logger.info(
      `Listening on http://localhost:8080 in ${import.meta.env.MODE} mode`
    )
  })
}

export const viteNodeApp = app
