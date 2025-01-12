import { useParams } from "react-router"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { ClearCanvasButton } from "~/components/clear-canvas-button"
import { EraserButton } from "~/components/eraser-button"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { client } from "~/lib/client"
import { DotEditCanvas } from "~/routes/_main.posts.$post.edit/components/dot-edit-canvas"
import { DotXtermColorPalette } from "~/routes/my.posts._index/components/dot-xterm-color-palette"
import { NewHeader } from "~/routes/my.posts._index/components/new-header"
import { createEmptyDotCells } from "~/utils/create-empty-dot-cells"

export default function Route() {
  const [rowsCount, setRowsCount] = useState(16)

  const [grid, setGrid] = useState(createEmptyDotCells(rowsCount))

  const [dotSize, setDotSize] = useState(16)

  const [colorIndex, setColorIndex] = useState<number | null>(1)

  const [eraserMode, setEraserMode] = useState(false)

  const [isSpacePressed, setIsSpacePressed] = useState(false)

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  const onDraw = (rowIndex: number, colIndex: number) => {
    if (!eraserMode && colorIndex === null) return
    const newGrid = [...grid]
    newGrid[rowIndex][colIndex] = eraserMode ? null : colorIndex
    setGrid(newGrid)
  }

  const onClearCanvas = () => {
    setGrid(createEmptyDotCells(rowsCount))
  }

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.posts.$post({
        json: {
          dots: grid.flat().join("-"),
          title: title,
          description: description,
        },
      })
      const json = await resp.json()
      return json
    },
  })

  const onSubmit = () => {
    mutation.mutate()
    toast("投稿しました")
  }

  const onMouseDown = () => {
    setIsSpacePressed(true)
  }

  const onMouseUp = () => {
    setIsSpacePressed(false)
  }

  /**
   * 現在の投稿を取得する
   * パラメータから投稿IDを取得する
   * パラメータには投稿IDの文字列のみが入る（型定義）
   */
  const params = useParams<"post">()

  const postId = params.post
  /**
   * パラメータが投稿をもっていない場合はエラーを返す
   */
  if (postId === undefined) {
    throw new Error("Post not found")
  }

  const postData = useQuery({
    queryKey: ["posts", postId, "edit"],
    async queryFn() {
      const resp = await client.posts[":post"].$get({
        param: { post: postId },
      })

      const post = await resp.json()

      return post
    },
  })

  if (postData.data === undefined) {
    return null
  }

  if (postData.data.isMine === false) {
    return null
  }

  return (
    <>
      <NewHeader
        onSubmit={onSubmit}
        dots={grid.flat().join("-")}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
      <main className="flex flex-col gap-2 max-w-screen-sm container py-8 h-custom-main">
        <div className="p-4 justify-center flex items-center flex-1">
          <Card className="overflow-hidden">
            <DotEditCanvas
              grid={grid}
              onClick={onDraw}
              dotSize={dotSize}
              isSpacePressed={isSpacePressed}
              onPressSpace={setIsSpacePressed}
            />
          </Card>
        </div>
        <DotXtermColorPalette
          colorIndex={colorIndex}
          setColorId={(colorIndex) => {
            setColorIndex(colorIndex)
            setEraserMode(false)
          }}
        />
        <div className="flex space-x-2">
          <EraserButton
            isActive={eraserMode}
            onChange={(eraserMode) => {
              setEraserMode(eraserMode)
              setColorIndex(null)
            }}
          />
          <ClearCanvasButton onClick={onClearCanvas} />
        </div>
        <Button
          className="sm:hidden"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {"塗る"}
        </Button>
      </main>
    </>
  )
}
