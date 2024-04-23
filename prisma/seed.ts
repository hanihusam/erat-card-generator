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
