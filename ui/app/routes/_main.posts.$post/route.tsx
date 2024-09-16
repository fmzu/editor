import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { Card } from "~/components/ui/card"
import { loaderClient } from "~/lib/loader-client"
import { DotPreviewCanvas } from "~/routes/_main._index/components/dot-preview-canvas"
import { SettingsCard } from "~/routes/_main.posts.$post/components/settings-card"

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
    <main className="px-8 sm:p-8 lg:p-16 container space-y-16">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-sm flex flex-col gap-y-8">
          <Card className="bg-gray-200 overflow-hidden shadow-xl w-full">
            <DotPreviewCanvas dots={data.dots} />
          </Card>
          <div className="px-16">
            <Card className="bg-white shadow-md p-4">
              <h1>{"作品タイトル"}</h1>
            </Card>
          </div>
        </div>
      </div>
      <SettingsCard />
    </main>
  )
}
