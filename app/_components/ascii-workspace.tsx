"use client"

import { AsciiCanvas } from "@/app/_components/ascii-canvas"
import { CanvasSizeSelectButton } from "@/app/_components/canvas-size-select-button"
import { ClearCanvasButton } from "@/app/_components/clear-canvas-button"
import { ColorPalette } from "@/app/_components/color-palette"
import { CurrentColors } from "@/app/_components/current-colors"
import { DotSizeSelectButton } from "@/app/_components/dot-size-select-button"
import { EraserButton } from "@/app/_components/eraser-button"
import { colorKeys } from "@/app/_utils/color-keys"
import { colors } from "@/app/_utils/colors"
import { createEmptyAsciiGrid } from "@/app/_utils/create-empty-ascii-cells"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

type Props = {
  code?: string
}

export const AsciiWorkspace = (props: Props) => {
  const [rowsCount, setRowsCount] = useState(8)

  // ドットの大きさを管理するための状態を作成します
  const [dotSize, setDotSize] = useState(64)

  const [grid, setGrid] = useState(createEmptyAsciiGrid(rowsCount))

  const [colorId, setColorId] = useState("00")

  const onDraw = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid]
    newGrid[rowIndex][colIndex][0] = eraserMode ? null : "a"
    newGrid[rowIndex][colIndex][1] = eraserMode ? null : colorId
    setGrid(newGrid)
  }

  const usedColors = new Set(grid.flat().map((cell) => cell[1]))

  const [eraserMode, setEraserMode] = useState(false)

  const onClearCanvas = () => {
    setGrid(createEmptyAsciiGrid(rowsCount))
  }

  /**
   * キャンバスのサイズを変更する
   * @param size
   */
  const onResizeCanvas = (size: number) => {
    setRowsCount(size)
    setGrid(createEmptyAsciiGrid(size))
  }

  const onResizeDotSize = (size: number) => {
    setDotSize(size)
  }

  return (
    <div className="flex p-4 gap-x-4 overflow-hidden w-full h-svh">
      <div className="flex-1 overflow-hidden h-full">
        <AsciiCanvas
          grid={grid}
          onClick={onDraw}
          dotSize={dotSize}
          colors={colors}
        />
      </div>
      <div className="w-80 flex flex-col gap-y-2">
        <div className="flex space-x-2">
          <CanvasSizeSelectButton onChange={onResizeCanvas} value={rowsCount} />
          <DotSizeSelectButton onChange={onResizeDotSize} value={dotSize} />
        </div>
        <div className="flex space-x-2">
          {/* 消しゴムモードのトグルボタンを追加します */}
          <EraserButton eraserMode={eraserMode} setEraserMode={setEraserMode} />
          {/* クリアボタンを追加します */}
          <ClearCanvasButton onClick={onClearCanvas} />
        </div>
        <div>
          <Tabs defaultValue="color-palette" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="color-palette">{"色"}</TabsTrigger>
              <TabsTrigger value="character">{"文字"}</TabsTrigger>
            </TabsList>
            <TabsContent value="color-palette">
              <ColorPalette
                colors={colors}
                colorId={colorId}
                setColorId={setColorId}
              />
            </TabsContent>
            <TabsContent value="character">
              <ColorPalette
                colors={colors}
                colorId={colorId}
                setColorId={setColorId}
              />
            </TabsContent>
          </Tabs>
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