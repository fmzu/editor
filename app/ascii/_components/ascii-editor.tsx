"use client"

import { ClearButton } from "@/app/_components/clear-button"
import { ColorPalette } from "@/app/_components/color-palette"
import { CurrentColors } from "@/app/_components/current-colors"
import { EditorHeader } from "@/app/_components/editor-header"
import { EraserButton } from "@/app/_components/eraser-button"
import { GridEditor } from "@/app/_components/grid-editor"
import { PixelSelectButton } from "@/app/_components/pixel-select-button"
import { colorKeys } from "@/app/_utils/color-keys"
import { colors } from "@/app/_utils/colors"
import { createEmptyGrid } from "@/app/_utils/create-empty-cells"
import { toGridFromString } from "@/app/_utils/to-grid-from-string"
import { toStringFromGrid } from "@/app/_utils/to-string-from-grid"
import { AsciiSizeSelectButton } from "@/app/ascii/_components/ascii-size-select-button"
import { useState } from "react"

type Props = {
  code?: string
}

export const AsciiEditor = (props: Props) => {
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
      <EditorHeader grid={grid} toStringFromGrid={toStringFromGrid} />
      <div className="flex gap-4">
        <ColorPalette
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
          <AsciiSizeSelectButton
            resizeGrid={resizeGrid}
            rowsCount={rowsCount}
          />
          <PixelSelectButton
            resizeDot={resizeDot}
            selectedDotSize={selectedDotSize}
          />
        </div>
      </div>
      <CurrentColors
        colorKeys={colorKeys}
        usedColors={usedColors}
        setColorId={setColorId}
        colors={colors}
      />
    </div>
  )
}
