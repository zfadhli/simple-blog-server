import { AppError } from '@lib/app-error.js'
import { catchAsync } from '@lib/catch-async.js'
import { prisma } from '@lib/prisma.js'
import { verifyToken } from '@lib/token.js'

export const authenticate = () =>
  catchAsync(async (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1]

    if (!token) {
      return next(new AppError('Login failed', 401))
    }

    const decoded = await verifyToken(token)

    const user = await prisma.user.findUnique({
      where: { id: decoded.payload.id },
    })

    if (!user) {
      return next(new AppError("User doesn't exist.", 401))
    }

    req.user = user
    res.locals.user = user
    next()
  })
