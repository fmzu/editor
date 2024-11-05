import { useParams } from "@remix-run/react"
import { useQuery } from "@tanstack/react-query"
import { Award } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { client } from "~/lib/client"
import { DotPreviewCanvas } from "~/routes/_main._index/components/dot-preview-canvas"
import { SettingsCard } from "~/routes/_main.posts.$post._index/components/settings-card"

export default function Route() {
  /**
   * パラメータから授業IDを取得する
   * パラメータにはプログラムIDの文字列のみが入る（型定義）
   */
  const params = useParams<"post">()

  const postId = params.post
  /**
   * パラメータがプログラムをもっていない場合はエラーを返す
   */
  if (postId === undefined) {
    throw new Error("Post not found")
  }
  const postData = useQuery({
    queryKey: ["posts", postId],
    async queryFn() {
      const resp = await client.api.posts[":post"].$get({
        param: { post: postId },
      })

      const post = await resp.json()

      return post
    },
  })

  // const likeData = useSuspenseQuery({
  //   queryKey: ["like"],
  //   async queryFn() {
  //     const resp = await client.api.posts[":post"].likes.$post({
  //       param: { post: postId },
  //     })

  //     const like = await resp.json()

  //     return like
  //   },
  // })

  const [isActive, setIsActive] = useState(false)

  const toggleActive = () => {
    setIsActive(!isActive)
    // likeData.refetch()
  }

  if (postData.data === null) {
    return null
  }

  if (postData.data === undefined) {
    return null
  }

  return (
    <main className="px-8 sm:p-8 lg:p-16 container space-y-16">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-sm flex flex-col gap-y-8">
          <Card className="bg-gray-200 overflow-hidden shadow-xl w-full">
            <DotPreviewCanvas dots={postData.data.dots} />
          </Card>
          <div className="px-16">
            <Card className="flex items-center space-x-2 justify-between bg-white shadow-md p-4">
              <h1>{"作品タイトル"}</h1>
              <Button
                variant={"secondary"}
                onClick={toggleActive}
                className={isActive ? "active" : ""}
              >
                <Award
                  className={isActive ? "w-4" : ""}
                  color={isActive ? "#000" : "#fbbf24"}
                />
              </Button>
            </Card>
          </div>
        </div>
      </div>
      <SettingsCard />
    </main>
  )
}