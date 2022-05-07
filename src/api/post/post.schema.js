export const postSchema = {
  title: 'string|min:3|trim',
  content: 'string|min:3|trim',
  $$strict: 'remove',
}

export const optionalPostSchema = {
  title: 'string|min:3|trim|optional',
  content: 'string|min:3|trim|optional',
  $$strict: 'remove',
}
