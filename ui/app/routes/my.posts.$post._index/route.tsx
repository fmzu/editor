import { useEffect, useState } from "react"
import { Card } from "~/components/ui/card"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { client } from "~/lib/client"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useParams } from "react-router"
import { DotEditor } from "~/routes/my.posts._index/components/dot-editor"
import { createEmptyDotCells } from "~/utils/create-empty-dot-cells"
import { toDotsFromText } from "~/utils/to-dots-from-text"
import { LockKeyholeOpenIcon, LockKeyholeIcon, TrashIcon } from "lucide-react"

const endpoint = client.posts[":post"]

export default function Component() {
  const param = useParams()

  if (param.post === undefined) {
    throw new Error("postId is undefined")
  }

  const postQuery = useSuspenseQuery({
    queryKey: [endpoint.$url({ param: { post: param.post } }).toString()],
    async queryFn() {
      if (param.post === undefined) {
        throw new Error("postId is undefined")
      }
      const resp = await endpoint.$get({
        param: { post: param.post },
      })
      return resp.json()
    },
  })

  const [rowsCount, setRowsCount] = useState(16)

  const [title, setTitle] = useState(postQuery.data.title ?? "")

  const [description, setDescription] = useState(() => {
    return postQuery.data.description ?? ""
  })

  const [isPublic, setIsPublic] = useState(false)

  const [value, setValue] = useState(() => {
    return toDotsFromText(postQuery.data.dots)
  })

  useEffect(() => {
    postQuery.refetch()
  }, [param.post])

  useEffect(() => {
    setValue(toDotsFromText(postQuery.data.dots))
    setTitle(postQuery.data.title ?? "")
    setDescription(postQuery.data.description ?? "")
  }, [postQuery.data])

  const mutation = useMutation({
    async mutationFn() {
      if (param.post === undefined) {
        throw new Error("postId is undefined")
      }
      const resp = await client.posts[":post"].$put({
        param: { post: param.post },
        json: {
          dots: value.flat().join("-"),
          title: title,
          description: description,
          isPublic: isPublic,
        },
      })
      return await resp.json()
    },
  })

  const onSubmit = async () => {
    await mutation.mutateAsync()
    toast("更新しました")
  }

  const onClearCanvas = () => {
    setValue(createEmptyDotCells(rowsCount))
  }

  return (
    <main className="flex-1 flex flex-col p-2 h-svh gap-2">
      <Card className="flex gap-x-2 p-2">
        <Input
          placeholder={"タイトル"}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
          disabled={mutation.isPending}
        />
        <Button
          variant={"destructive"}
          disabled={mutation.isPending}
          onClick={() => {
            alert("未実装")
          }}
        >
          {<TrashIcon />}
        </Button>
        <Button
          variant={isPublic ? "destructive" : "secondary"}
          disabled={mutation.isPending}
          onClick={() => {
            setIsPublic(!isPublic)
          }}
        >
          {isPublic ? <LockKeyholeOpenIcon /> : <LockKeyholeIcon />}
          {isPublic ? "公開" : "非公開"}
        </Button>
        <Button onClick={onSubmit} disabled={mutation.isPending}>
          {"保存"}
        </Button>
      </Card>
      <div className="flex-1">
        <DotEditor
          value={value}
          rowsCount={rowsCount}
          onChange={setValue}
          onClearCanvas={onClearCanvas}
        />
      </div>
    </main>
  )
}
