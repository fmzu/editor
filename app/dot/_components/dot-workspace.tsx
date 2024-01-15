"use client"

import { CanvasSizeSelectButton } from "@/app/_components/canvas-size-select-button"
import { ClearCanvasButton } from "@/app/_components/clear-canvas-button"
import { ColorPalette } from "@/app/_components/color-palette"
import { CurrentColors } from "@/app/_components/current-colors"
import { DotSizeSelectButton } from "@/app/_components/dot-size-select-button"
import { EditorHeader } from "@/app/_components/editor-header"
import { EraserButton } from "@/app/_components/eraser-button"
import { colorKeys } from "@/app/_utils/color-keys"
import { colors } from "@/app/_utils/colors"
import { createEmptyGrid } from "@/app/_utils/create-empty-cells"
import { toGridFromString } from "@/app/_utils/to-grid-from-string"
import { toStringFromGrid } from "@/app/_utils/to-string-from-grid"
import { DotCanvas } from "@/app/dot/_components/dot-canvas"
import { useState } from "react"

type Props = {
  code?: string
}

export const DotWorkspace = (props: Props) => {
  const [rowsCount, setRowsCount] = useState(8)

  // ドットの大きさを管理するための状態を作成します
  const [dotSize, setDotSize] = useState(32)

  const [grid, setGrid] = useState(
    props.code ? toGridFromString(props.code) : createEmptyGrid(rowsCount),
  )

  const [colorId, setColorId] = useState("00")

  const onDraw = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid]
    // 消しゴムモードが有効なら色をnullに、そうでなければ選択中の色に設定します
    newGrid[rowIndex][colIndex].color = eraserMode ? null : colorId
    setGrid(newGrid)
    // router.replace(`/${toStringFromGrid(newGrid)}`)
  }

  const usedColors = new Set(grid.flat().map((cell) => cell.color))

  const [eraserMode, setEraserMode] = useState(false)

  const onClearCanvas = () => {
    setGrid(createEmptyGrid(rowsCount))
  }

  /**
   * キャンバスのサイズを変更する
   * @param size
   */
  const onResizeCanvas = (size: number) => {
    setRowsCount(size)
    setGrid(createEmptyGrid(size))
  }

  const onResizeDotSize = (size: number) => {
    setDotSize(size)
  }

  return (
    <div className="flex p-4 gap-x-4 overflow-hidden w-full h-svh">
      <div className="flex-1 overflow-hidden h-full">
        <DotCanvas
          grid={grid}
          onClick={onDraw}
          dotSize={dotSize}
          colors={colors}
        />
      </div>
      <div className="w-80 flex flex-col gap-y-2">
        <EditorHeader grid={grid} toStringFromGrid={toStringFromGrid} />
        <div className="flex space-x-2">
          <CanvasSizeSelectButton onChange={onResizeCanvas} value={rowsCount} />
          <DotSizeSelectButton onChange={onResizeDotSize} value={dotSize} />
        </div>
        <div className="flex space-x-2">
          <EraserButton eraserMode={eraserMode} setEraserMode={setEraserMode} />
          <ClearCanvasButton onClick={onClearCanvas} />
        </div>
        <div>
          <ColorPalette
            colors={colors}
            colorId={colorId}
            setColorId={setColorId}
          />
        </div>
        <CurrentColors
          colorKeys={colorKeys}
          usedColors={usedColors}
          setColorId={setColorId}
          colors={colors}
        />
      </div>
    </div>
  )
}
