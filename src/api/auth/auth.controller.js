import R from 'rambda'
import bcrypt from 'bcryptjs'
import { prisma } from '@lib/prisma.js'
import { signToken } from '@lib/token.js'
import { AppError } from '@lib/app-error.js'
import { catchAsync } from '@lib/catch-async.js'

export const register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body

  const isUserExist = await prisma.user.findUnique({ where: { email } })

  if (isUserExist) {
    return next(new AppError('User already exist', 400))
  }

  const hash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { username, email, password: hash },
  })

  const token = await signToken(user)

  res.cookie('token', token, {
    expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: import.meta.PROD ? true : false
  })

  return res.json({
    ...R.pick('id,email,username', user),
    token,
  })
})

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user?.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }

  const token = await signToken(user)

  res.cookie('token', token, {
    expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: import.meta.PROD ? true : false
  })

  return res.json({
    ...R.pick('id,email,username', user),
    token,
  })
})

export const logout = catchAsync(async (req, res, next) => {
  res.cookie('token', '', {
    expires: new Date(0),
    httpOnly: true,
  })
  return res.status(200).json({})
})
