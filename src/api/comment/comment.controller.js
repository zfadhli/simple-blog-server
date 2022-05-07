import { prisma } from '@lib/prisma.js'
import { AppError } from '@lib/app-error.js'
import { catchAsync } from '@lib/catch-async.js'

export const index = catchAsync(async (req, res) => {
  const comment = await prisma.comment.findMany({
    where: { postId: +req.params.postId },
  })

  return res.json(comment)
})

export const show = catchAsync(async (req, res, next) => {
  const comment = await prisma.comment.findUnique({
    where: { id: +req.params.commentId },
  })

  if (!comment || comment?.postId !== +req.params.postId) {
    return next(new AppError('Comment not found', 404))
  }

  return res.json(comment)
})

export const store = catchAsync(async (req, res) => {
  const comment = await prisma.comment.create({
    data: { ...req.body, postId: +req.params.postId },
  })

  return res.json(comment)
})

export const update = catchAsync(async (req, res, next) => {
  const comment = await prisma.comment.findUnique({
    where: { id: +req.params.commentId },
  })

  if (!comment || comment.postId !== +req.params.postId) {
    return next(new AppError('Comment not found', 404))
  }

  const newComment = await prisma.comment.update({
    where: { id: +req.params.commentId },
    data: { ...req.body },
  })

  return res.json(newComment)
})

export const destroy = catchAsync(async (req, res, next) => {
  const comment = await prisma.comment.findUnique({
    where: { id: +req.params.commentId },
  })

  if (!comment || comment.postId !== +req.params.postId) {
    return next(new AppError('Comment not found', 404))
  }

  await prisma.comment.delete({
    where: { id: +req.params.commentId },
  })

  return res.status(204).json()
})
