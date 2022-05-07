import R from 'rambda'
import { prisma, exclude } from '@lib/prisma.js'
import { AppError } from '@lib/app-error'
import { catchAsync } from '@lib/catch-async.js'

export const index = catchAsync(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: +req.user.id },
    select: { ...exclude('user', ['password']), posts: true },
  })

  return res.json(user)
})

export const update = catchAsync(async (req, res, next) => {
  const isTaken = await prisma.user.findMany({
    where: {
      email: req.body.email,
    },
  })

  if (
    isTaken.length > 0 &&
    req.user.email !== req.body.email &&
    req.user.username !== req.body.username
  ) {
    return next(new AppError('Email or Username already taken', 400))
  }

  const user = await prisma.user.update({
    where: {
      email: req.user.email,
    },
    data: req.body,
  })

  return res.json({
    ...R.pick('id,email,username', user),
  })
})
