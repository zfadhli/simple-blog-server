import { prisma, exclude } from '@lib/prisma.js'
import { AppError } from '@lib/app-error.js'
import { catchAsync } from '@lib/catch-async.js'
import slugify from '@sindresorhus/slugify'

export const index = catchAsync(async (req, res) => {
  const post = await prisma.post.findMany()

  return res.json(post)
})

export const show = catchAsync(async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: +req.params.postId },
    include: {
      user: true, //{ ...exclude('user', ['password']) },
      tags: true,
      comments: true,
    },
  })

  delete post?.user?.password
  return res.json(post)
})

export const store = catchAsync(async (req, res) => {
  console.log('params', req.user)
  const post = await prisma.post.create({
    data: {
      ...req.body,
      slug: slugify(req.body.title),
      userId: +req.user.id,
    },
  })

  console.log('post: ', post)

  return res.json(post)
})

export const update = catchAsync(async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: { id: +req.params.postId },
  })

  if (!post || post.userId !== +req.user.id) {
    return next(new AppError('Post not found', 404))
  }

  const newSlug = req.body?.title ? slugify(req.body?.title) : post.slug

  const newPost = await prisma.post.update({
    where: { id: +req.params.postId },
    data: { ...req.body, slug: newSlug },
  })

  return res.json(newPost)
})

export const destroy = catchAsync(async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: { id: +req.params.postId },
  })

  if (!post || post.userId !== +req.user.id) {
    return next(new AppError('Post not found', 404))
  }

  await prisma.post.delete({
    where: { id: +req.params.postId },
  })

  return res.status(204).json()
})
