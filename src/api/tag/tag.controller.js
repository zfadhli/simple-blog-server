import { prisma } from '@lib/prisma.js'
import { AppError } from '@lib/app-error.js'
import { catchAsync } from '@lib/catch-async.js'
import slugify from '@sindresorhus/slugify'

export const index = catchAsync(async (req, res) => {
  const tag = await prisma.tag.findMany()

  return res.json(tag)
})

export const show = catchAsync(async (req, res) => {
  const tag = await prisma.tag.findUnique({
    where: { id: +req.params.slug },
  })

  return res.json(tag)
})

export const store = catchAsync(async (req, res) => {
  const tag = await prisma.tag.create({
    data: { ...req.body, slug: slugify(req.body.name) },
  })

  return res.json(tag)
})

export const update = catchAsync(async (req, res, next) => {
  const tag = await prisma.tag.findUnique({
    where: { id: +req.params.tagId },
  })

  if (!tag) {
    return next(new AppError('Tag not found', 404))
  }

  const newSlug = req.body?.name ? slugify(req.body?.name) : tag.slug

  const newTag = await prisma.tag.update({
    where: { id: +req.params.tagId },
    data: { ...req.body, slug: newSlug },
  })

  return res.json(newTag)
})

export const destroy = catchAsync(async (req, res, next) => {
  const tag = await prisma.tag.findUnique({
    where: { id: +req.params.tagId },
  })

  if (!tag) {
    return next(new AppError('Tag not found', 404))
  }

  await prisma.tag.delete({
    where: { id: +req.params.tagId },
  })

  return res.status(204).json()
})
