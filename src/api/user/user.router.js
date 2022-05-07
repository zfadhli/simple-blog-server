import { Router } from 'express'
import * as controller from './user.controller.js'
import { userSchema } from './user.schema.js'
import { validate } from '@middlewares/validator.js'
import { authenticate } from '@middlewares/authenticate.js'

export default Router()
  .get('/', authenticate(), controller.index)
  .put('/', authenticate(), validate(userSchema), controller.update)
