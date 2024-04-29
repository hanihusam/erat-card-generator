import {db} from '~/utils/db.server'
import {json} from '@remix-run/node'

export async function loader() {
  const count = await db.content.count()
  const randomRowNumber = Math.floor(Math.random() * count)
  const [data] = await db.content.findMany({
    skip: randomRowNumber,
    take: 1,
  })

  return json({
    data,
  })
}
