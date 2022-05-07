import Validator from 'fastest-validator'

export const validate = (schema) => async (req, res, next) => {
  const check = new Validator().compile(schema)
  const result = check(req.body)

  if (result.length == undefined) {
    return next()
  }

  return res.status(400).json(result)
}
