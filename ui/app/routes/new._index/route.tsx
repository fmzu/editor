import { useEffect, useState } from "react"
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

  const [isDrawMode, setDrawMode] = useState(false)

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  const onUpdateCell = (rowIndex: number, colIndex: number) => {
    if (isDrawMode === false) return
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
    setDrawMode(true)
  }

  const onMouseUp = () => {
    setDrawMode(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setDrawMode(true)
      }
    }
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setDrawMode(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

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
      <main className="flex flex-col px-0 h-custom-main">
        <div className="flex-1 w-full px-2 overflow-hidden">
          <Card className="overflow-hidden h-full">
            <DotCanvas
              grid={grid}
              onChangeCell={onUpdateCell}
              dotSize={dotSize}
            />
          </Card>
        </div>
        <div className="p-4 space-y-4">
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
        </div>
      </main>
    </>
  )
}
