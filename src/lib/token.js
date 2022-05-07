import jwt from 'jsonwebtoken'

export const signToken = async (user) => {
  const { id, name, email } = user
  return jwt.sign(
    { id, name, email },
    process.env.JWT_SECRET || 'superSecret',
    {
      expiresIn: '60d',
    }
  )
}

export const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET || 'superSecret', {
    complete: true,
  })
}
