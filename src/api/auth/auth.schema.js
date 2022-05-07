export const registerSchema = {
  username: 'string|trim',
  email: 'email|normalize|trim',
  password: 'string|trim',
  passwordConfirm: 'equal|field:password|trim',
  $$strict: 'remove',
}

export const loginSchema = {
  email: 'email|normalize|trim',
  password: 'string|trim',
  $$strict: 'remove',
}
