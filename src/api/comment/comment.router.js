import { Router } from 'express'
import * as controller from './comment.controller.js'
import { authenticate } from '@middlewares/authenticate.js'
import { validate } from '@middlewares/validator.js'
import { commentSchema } from './comment.schema.js'

export default Router({ mergeParams: true })
  .get('/', controller.index)
  .get('/:commentId', controller.show)
  .post('/', authenticate(), validate(commentSchema), controller.store)
  .put(
    '/:commentId',
    authenticate(),
    validate(commentSchema),
    controller.update
  )
  .delete('/:commentId', authenticate(), controller.destroy)
