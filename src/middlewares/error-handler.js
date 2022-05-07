import { AppError } from '@lib/app-error'

export const globalErrorHandler = () => (err, req, res, next) => {
  if (err.name === 'JsonWebTokenError') {
    err = new AppError('Invalid token', 401)
  }

  if (err.name === 'TokenExpiredError') {
    err = new AppError('Expired token', 401)
  }

  if (err.isOperational || import.meta.env.DEV) {
    return res.status(err.statusCode || 400).json({
      message: err.message,
      stack: import.meta.env.DEV ? err.stack : undefined,
    })
  }

  return res.status(500).json({
    message: 'Something went very wrong!',
  })
}
