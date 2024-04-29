import type {MetaFunction} from '@remix-run/node'
import {json, useActionData} from '@remix-run/react'

import {db} from '~/utils/db.server'

export const meta: MetaFunction = () => {
  return [
    {title: 'New Remix App'},
    {name: 'description', content: 'Welcome to Remix!'},
  ]
}

export async function action() {
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

export default function Index() {
  const actionData = useActionData<typeof action>()

  return (
    <>
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Generate to get your card!
            </h2>
            {actionData ? (
              <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
                {actionData.data.content}
              </p>
            ) : null}
            <form method="post" className="mx-auto mt-10 flex text-center">
              <button
                type="submit"
                className="rounded-md mx-auto bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Generate
              </button>
            </form>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient
                  id="759c1415-0410-454c-8f7c-9a820de03641"
                  cx={0}
                  cy={0}
                  r={1}
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
