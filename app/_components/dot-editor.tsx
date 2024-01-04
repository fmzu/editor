"use client"

import { colorKeys } from "@/app/_utils/color-keys"
import { colors } from "@/app/_utils/colors"
import { createEmptyGrid } from "@/app/_utils/create-empty-cells"
import { toGridFromString } from "@/app/_utils/to-grid-from-string"
import { toStringFromGrid } from "@/app/_utils/to-string-from-grid"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CircleDashed, Eraser } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  code?: string
}

export const DotEditor = (props: Props) => {
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
            navigator.clipboard.writeText(window.location.href)
            toast("コピーしました")
          }}
        >
          {"コピー"}
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="grid grid-cols-4 ">
          {colorKeys.map((color) => (
            <div key={color} className="flex">
              <Button
                className={cn(
                  "w-8 h-8 p-0",
                  colorId === color ? "border-4 border-white" : "",
                )}
                key={color}
                variant={"default"}
                onClick={() => setColorId(color)}
                style={{ backgroundColor: colors.get(color) }}
              />
            </div>
          ))}
        </div>
        <div>
          <Card>
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((cell, colIndex) => (
                  <button
                    key={colIndex}
                    type="button"
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={cn("border")}
                    style={{
                      width: `${dotSize}px`,
                      height: `${dotSize}px`,
                      backgroundColor:
                        cell.color !== null ? colors.get(cell.color) : "white",
                    }}
                  />
                ))}
              </div>
            ))}
          </Card>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <div className="flex space-x-2 overflow-hidden">
              {/* 消しゴムモードのトグルボタンを追加します */}
              <Button
                className="items-stretch space-x-2"
                onClick={() => setEraserMode(!eraserMode)}
              >
                <Eraser className=" w-4 mr-2" />
                {eraserMode
                  ? "消しゴムモードをオフにする"
                  : "消しゴムモードをオンにする"}
              </Button>
            </div>
            <div className="flex space-x-2 overflow-hidden">
              {/* クリアボタンを追加します */}
              <Button
                className="items-stretch space-x-2"
                onClick={handleClearClick}
              >
                <CircleDashed className=" w-4 mr-2" />
                {"クリア"}
              </Button>
            </div>
          </div>
          <div className="flex space-x-2 overflow-hidden">
            {/* ...既存のコード... */}
            {/* サイズを変更するボタンを追加します */}
            <Button
              onClick={() => resizeGrid(8)}
              style={{
                border: rowsCount === 8 ? "4px solid white" : "none",
              }}
            >
              {"8x8"}
            </Button>
            <Button
              onClick={() => resizeGrid(16)}
              style={{
                border: rowsCount === 16 ? "4px solid white" : "none",
              }}
            >
              {"16x16"}
            </Button>
            <Button
              onClick={() => resizeGrid(32)}
              style={{
                border: rowsCount === 32 ? "4px solid white" : "none",
              }}
            >
              {"32x32"}
            </Button>
            <Button
              onClick={() => resizeGrid(64)}
              style={{
                border: rowsCount === 64 ? "4px solid white" : "none",
              }}
            >
              {"64x64"}
            </Button>
          </div>
          <div className="flex space-x-2 overflow-hidden">
            {/* ...既存のコード... */}
            {/* ドットの大きさを変更するボタンを追加します */}
            <Button
              onClick={() => resizeDot(8)}
              style={{
                border: selectedDotSize === 8 ? "4px solid white" : "none",
              }}
            >
              {"8px"}
            </Button>
            <Button
              onClick={() => resizeDot(16)}
              style={{
                border: selectedDotSize === 16 ? "4px solid white" : "none",
              }}
            >
              {"16px"}
            </Button>
            <Button
              onClick={() => resizeDot(32)}
              style={{
                border: selectedDotSize === 32 ? "4px solid white" : "none",
              }}
            >
              {"32px"}
            </Button>
            <Button
              onClick={() => resizeDot(64)}
              style={{
                border: selectedDotSize === 64 ? "4px solid white" : "none",
              }}
            >
              {"64px"}
            </Button>
          </div>
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
