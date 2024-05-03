import {PrismaClient} from '@prisma/client'
import initData from './data/init_content.json'

type InitData = {
  content: string
  contentCategory: string
  contentSubCategory: string
}

const db = new PrismaClient()

async function seed() {
  const data = initData as InitData[]

  const kody = await db.user.create({
    data: {
      email: 'kody@gmail.com',
      // this is a hashed version of "twixrox"
      passwordHash:
        '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
    },
  })

  for (const {content, contentCategory, contentSubCategory} of data) {
    await db.category.upsert({
      where: {name: contentCategory},
      create: {
        name: contentCategory,
      },
      update: {},
    })

    await db.subCategory.upsert({
      where: {name: contentSubCategory},
      create: {
        name: contentSubCategory,
        categoryName: contentCategory,
      },
      update: {},
    })

    await db.content.upsert({
      where: {content},
      create: {
        content,
        contentCategory,
        contentSubCategory,
        userId: kody.id,
      },
      update: {},
    })
  }
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
