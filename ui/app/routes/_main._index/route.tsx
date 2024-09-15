import { json, LoaderFunctionArgs } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { Card } from "~/components/ui/card"
import { loaderClient } from "~/lib/loader-client"
import { DotPreviewCanvas } from "~/routes/_main._index/components/dot-preview-canvas"

export async function loader(args: LoaderFunctionArgs) {
  const client = loaderClient(args.context.cloudflare.env.API.fetch)

  const resp = await client.api.posts.$get()

  const posts = await resp.json()

  return json(posts)
}

export default function Route() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="grid grid-cols-4 gap-2 p-4">
      {data.map((post) => (
        <Card key={post.id} className="bg-gray-200 overflow-hidden p-2">
          <div className="overflow-hidden rounded-md">
            <DotPreviewCanvas dots={post.dots} />
          </div>
          <p>{"post.name"}</p>
        </Card>
      ))}
    </main>
  )
}
