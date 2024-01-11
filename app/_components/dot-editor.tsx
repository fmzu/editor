"use client"

import { ClearButton } from "@/app/_components/clear-button"
import { EraserButton } from "@/app/_components/eraser-button"
import { GridEditor } from "@/app/_components/grid-editor"
import { PixelSelectButton } from "@/app/_components/pixel-select-button"
import { SelectColors } from "@/app/_components/select-colors"
import { SizeSelectButton } from "@/app/_components/size-select-button"
import { colorKeys } from "@/app/_utils/color-keys"
import { colors } from "@/app/_utils/colors"
import { createEmptyGrid } from "@/app/_utils/create-empty-cells"
import { toGridFromString } from "@/app/_utils/to-grid-from-string"
import { toStringFromGrid } from "@/app/_utils/to-string-from-grid"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  code?: string
}

export const DotEditor = (props: Props) => {
  // const router = useRouter()

  const [rowsCount, setRowsCount] = useState(8)

  // ドットの大きさを管理するための状態を作成します
  const [dotSize, setDotSize] = useState(32)

  const [grid, setGrid] = useState(
    props.code ? toGridFromString(props.code) : createEmptyGrid(rowsCount),
  )

  const [colorId, setColorId] = useState("00")

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid]
    // 消しゴムモードが有効なら色をnullに、そうでなければ選択中の色に設定します
    newGrid[rowIndex][colIndex].color = eraserMode ? null : colorId
    setGrid(newGrid)
    // URLを更新します
    // router.replace(`/${toStringFromGrid(newGrid)}`)
  }

  const usedColors = new Set(grid.flat().map((cell) => cell.color))

  const [eraserMode, setEraserMode] = useState(false)

  const handleClearClick = () => {
    setGrid(createEmptyGrid(rowsCount))
  }

  // グリッドのサイズを変更する関数を追加します
  const resizeGrid = (size: number) => {
    setRowsCount(size)
    setGrid(createEmptyGrid(size))
  }

  // 選択中のドットの大きさを表す状態を作成します
  const [selectedDotSize, setSelectedDotSize] = useState(32)

  const resizeDot = (size: number) => {
    setDotSize(size)
    setSelectedDotSize(size)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2 overflow-hidden">
        <Card className="flex-1 overflow-hidden items-center">
          <pre
            className="whitespace-nowrap overflow-hidden h-full px-1"
            style={{ lineHeight: "2.5rem" }}
          >
            {toStringFromGrid(grid)}
          </pre>
        </Card>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `https://editor-beige.vercel.app/${toStringFromGrid(grid)}`,
            )
            toast("コピーしました")
          }}
        >
          {"コピー"}
        </Button>
      </div>
      <div className="flex gap-4">
        <SelectColors
          colors={colors}
          colorId={colorId}
          setColorId={setColorId}
        />
        <div>
          <GridEditor
            grid={grid}
            handleCellClick={handleCellClick}
            dotSize={dotSize}
            colors={colors}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            {/* 消しゴムモードのトグルボタンを追加します */}
            <EraserButton
              eraserMode={eraserMode}
              setEraserMode={setEraserMode}
            />
            {/* クリアボタンを追加します */}
            <ClearButton handleClearClick={handleClearClick} />
          </div>
          <SizeSelectButton resizeGrid={resizeGrid} rowsCount={rowsCount} />
          <PixelSelectButton
            resizeDot={resizeDot}
            selectedDotSize={selectedDotSize}
          />
        </div>
      </div>
      <div className="flex flex-wrap space-x-2">
        {colorKeys
          .filter((colorKey) => usedColors.has(colorKey))
          .map((colorKey) => (
            <div key={colorKey} className="flex items-center gap-2">
              <Button
                className="gap-x-2 items-center"
                variant={"outline"}
                onClick={() => setColorId(colorKey)}
                style={{ backgroundColor: "gray" }}
              >
                <div
                  className="w-4 h-4"
                  style={{ backgroundColor: colors.get(colorKey) }}
                />
                {colorKey}
              </Button>
            </div>
          ))}
      </div>
    </div>
  )
}
