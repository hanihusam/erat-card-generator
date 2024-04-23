import {PrismaClient} from '@prisma/client'
import initData from './data/init_content.json'

type InitData = {
  content: string
  category: string
  subCategory: string
}

const db = new PrismaClient()

async function seed() {
  const data = initData as InitData[]

  for (const {content, category, subCategory} of data) {
    await db.content.upsert({
      where: {content},
      create: {
        content,
        category: {
          connectOrCreate: {
            where: {name: category},
            create: {name: category},
          },
        },
        subCategory: {
          connectOrCreate: {
            where: {name: subCategory},
            create: {
              name: subCategory,
              category: {
                connectOrCreate: {
                  where: {name: category},
                  create: {name: category},
                },
              },
            },
          },
        },
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
