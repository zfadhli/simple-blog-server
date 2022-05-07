import { Router } from 'express'
import * as controller from './auth.controller.js'
import { validate } from '@middlewares/validator.js'
import { registerSchema, loginSchema } from './auth.schema.js'

export default Router()
  .post('/register', validate(registerSchema), controller.register)
  .post('/login', validate(loginSchema), controller.login)
  .get('/logout', controller.logout)
