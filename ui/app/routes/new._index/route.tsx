import { useState } from "react"
import { DotCanvas } from "./components/dot-canvas"
import { createEmptyDotCells } from "~/utils/create-empty-dot-cells"
import { DotXtermColorPalette } from "./components/dot-xterm-color-palette"
import { Card } from "~/components/ui/card"
import { EraserButton } from "~/components/eraser-button"
import { ClearCanvasButton } from "~/components/clear-canvas-button"
import { useMutation } from "@tanstack/react-query"
import { client } from "~/lib/client"
import { toast } from "sonner"
import { NewHeader } from "~/routes/new/components/new-header"
import { Button } from "~/components/ui/button"

export default function NextPage() {
  const [rowsCount, setRowsCount] = useState(16)

  const [grid, setGrid] = useState(createEmptyDotCells(rowsCount))

  const [dotSize, setDotSize] = useState(16)

  const [colorIndex, setColorIndex] = useState<number | null>(1)

  const [eraserMode, setEraserMode] = useState(false)

  const [isSpacePressed, setIsSpacePressed] = useState(false)

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
      const resp = await client.api.posts.$post({
        json: {
          dots: grid.flat().join("-"),
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

  return (
    <>
      <NewHeader onSubmit={onSubmit} dots={grid.flat().join("-")} />
      <main className="flex flex-col gap-2 max-w-screen-sm container py-8 h-custom-main">
        <div className="p-4 justify-center flex items-center flex-1">
          <Card className="overflow-hidden">
            <DotCanvas
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
            eraserMode={eraserMode}
            setEraserMode={(eraserMode) => {
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
