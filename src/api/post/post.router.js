import { Router } from 'express'
import * as controller from './post.controller.js'
import { authenticate } from '@middlewares/authenticate.js'
import { validate } from '@middlewares/validator.js'
import { postSchema, optionalPostSchema } from './post.schema.js'

export default Router()
  .get('/', controller.index)
  .get('/:postId', controller.show)
  .post('/', authenticate(), validate(postSchema), controller.store)
  .put(
    '/:postId',
    authenticate(),
    validate(optionalPostSchema),
    controller.update
  )
  .delete('/:postId', authenticate(), controller.destroy)
