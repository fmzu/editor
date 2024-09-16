import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { Card } from "~/components/ui/card"
import { loaderClient } from "~/lib/loader-client"
import { DotPreviewCanvas } from "~/routes/_main._index/components/dot-preview-canvas"

export async function loader(args: LoaderFunctionArgs) {
  if (!args.params.post) {
    throw new Error("Post not found")
  }

  const client = loaderClient(
    args.context.cloudflare.env.API.fetch.bind(args.context.cloudflare.env.API),
  )

  const resp = await client.api.posts[":post"].$get({
    param: { post: args.params.post },
  })

  const post = await resp.json()

  return json(post)
}

export default function Route() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="px-8 sm:p-8 lg:p-16 container">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-sm">
          <Card className="bg-gray-200 overflow-hidden shadow-xl w-full">
            <DotPreviewCanvas dots={data.dots} />
          </Card>
          <div className="pl-4 pr-52">
            <Card className="bg-white rounded-t-none rounded-b-sm shadow-md px-4 py-1">
              <h1>{"作品タイトル"}</h1>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
