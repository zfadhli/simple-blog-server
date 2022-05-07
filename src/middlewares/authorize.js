import { AppError } from '@lib/app-error.js'

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You don't have permission", 403))
    }

    next()
  }
}
