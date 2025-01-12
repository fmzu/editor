import { useState } from "react"
import { createEmptyDotCells } from "~/utils/create-empty-dot-cells"
import { Card } from "~/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { client } from "~/lib/client"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useNavigate } from "react-router"
import { DotEditor } from "~/routes/my.posts._index/components/dot-editor"
import { LockKeyholeIcon, LockKeyholeOpenIcon } from "lucide-react"

export default function Component() {
  const navigate = useNavigate()

  const [rowsCount, setRowsCount] = useState(16)

  const [
    /**
     * 16x16のセルの値
     */
    value,
    setValue,
  ] = useState(createEmptyDotCells(rowsCount))

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  const [isPublic, setIsPublic] = useState(false)

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.posts.$post({
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
    const result = await mutation.mutateAsync()
    toast("投稿しました")
    navigate(`/my/posts/${result.postId}`)
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
