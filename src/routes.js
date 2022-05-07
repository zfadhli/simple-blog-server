import { Router } from 'express'
import auth from '@api/auth/auth.router.js'
import user from '@api/user/user.router.js'
import post from '@api/post/post.router.js'
import tag from '@api/tag/tag.router.js'
import comment from '@api/comment/comment.router.js'

export const routes = Router()
  .use('/auth', auth)
  .use('/user', user)
  .use('/post', post)
  .use('/tag', tag)
  .use('/post/:postId/comment', comment)
