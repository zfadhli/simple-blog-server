import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { slugifyWithCounter } from '@sindresorhus/slugify'

const prisma = new PrismaClient()
const slugify = slugifyWithCounter()

const users = [
  {
    username: 'admin',
    email: 'admin@email.com',
    password: bcrypt.hashSync('admin', 12),
    posts: {
      create: [
        {
          title:
            'Use the auxiliary JSON card, then you can copy the optical matrix!',
          slug: slugify(
            'Use the auxiliary JSON card, then you can copy the optical matrix!'
          ),
          content:
            'Recusandae id nemo ut amet quas voluptas. Quas vero et molestiae esse. Eum qui quia nulla. Cum ipsa aut voluptate et iste ut porro adipisci. Quisquam error sed quasi voluptates ea nobis consequatur explicabo.',
          tags: {
            create: [
              {
                name: 'node',
                slug: slugify('node'),
              },
              {
                name: 'react',
                slug: slugify('react'),
              },
            ],
          },
          comments: {
            create: [
              {
                content:
                  "The time I spent thinking about how I was better than somebody else or worrying about somebody else's attitude was time I could put to better use.",
              },
              {
                content:
                  "Be thankful when you don't know something for it gives you the opportunity to learn.",
              },
            ],
          },
        },
      ],
    },
  },
  {
    username: 'zfadhli',
    email: 'zfadhli@email.com',
    password: bcrypt.hashSync('secret', 12),
    posts: {
      create: [
        {
          title: 'We need to calculate the wireless TCP circuit!',
          slug: slugify('We need to calculate the wireless TCP circuit!'),
          content:
            'Dolores sunt cupiditate esse est sit commodi sed numquam qui, quia commodi occaecati consequuntur nemo fugiat qui est consequatur sed consequatur est possimus nostrum ipsum quaerat quaerat ipsum voluptatem deserunt cum facilis. Quos sunt doloribus nostrum quas. Quos occaecati consequuntur et necessitatibus laborum quaerat, repellat. Id quae non quia at vel necessitatibus, exercitationem sit facilis nostrum dolores maiores qui quia cum consectetur doloribus nihil beatae dicta aut, neque reiciendis, tenetur non occaecati ipsum error beatae quos exercitationem omnis, quae et consequatur. Deserunt cupiditate quia unde sed.',
          tags: {
            create: [
              {
                name: 'svelte',
                slug: slugify('svelte'),
              },
            ],
          },
          comments: {
            create: [
              {
                content:
                  "Be sure what you want and be sure about yourself. Fashion is not just beauty, it's about good attitude. You have to believe in yourself and be strong.",
              },
            ],
          },
        },
      ],
    },
  },
  {
    username: 'kowu',
    email: 'kowu@email.com',
    password: bcrypt.hashSync('secret', 12),
  },
]

async function main() {
  console.log(`Start seeding ...`)

  users.forEach(async (user) => {
    await prisma.user.create({ data: user })
  })

  console.log(`Seeding complete`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
