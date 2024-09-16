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
    <main className="p-8 lg:p-16 container">
      <div className="flex justify-center items-center">
        <Card className="bg-gray-200 overflow-hidden shadow-md max-w-sm w-full">
          <DotPreviewCanvas dots={data.dots} />
        </Card>
      </div>
    </main>
  )
}
