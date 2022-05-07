import { Router } from 'express'
import * as controller from './tag.controller.js'
import { authenticate } from '@middlewares/authenticate.js'
import { validate } from '@middlewares/validator.js'
import { tagSchema } from './tag.schema.js'

export default Router()
  .get('/', controller.index)
  .get('/:tagId', controller.show)
  .post('/', authenticate(), validate(tagSchema), controller.store)
  .put('/:tagId', authenticate(), validate(tagSchema), controller.update)
  .delete('/:tagId', authenticate(), controller.destroy)
