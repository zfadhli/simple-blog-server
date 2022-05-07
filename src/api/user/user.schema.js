export const userSchema = {
  email: 'email|normalize|trim',
  username: 'string|min:3|trim',
  $$strict: 'remove',
}
