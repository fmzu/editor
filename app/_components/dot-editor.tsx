"use client"

import { colors } from "@/app/_utils/colors"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CircleDashed, Eraser } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

// セルの数と色を定義します
const DEFAULT_COLOR = "#000000" // 黒

// セルの型を定義します
type Cell = {
  color: string | null
}

type Props = {
  code?: string
}

export const DotEditor = (props: Props) => {
  const [rowsCount, setRowsCount] = useState(8)

  // グリッドの初期状態を作成します
  const createEmptyGrid = (): Cell[][] => {
    const rows: Cell[][] = []
    for (let i = 0; i < rowsCount; i++) {
      rows.push([])
      for (let j = 0; j < rowsCount; j++) {
        rows[i].push({ color: null })
      }
    }
    return rows
  }

  /**
   * 文字列をグリッドに変換する
   * @param str
   * @returns
   */
  const stringToGrid = (str: string): Cell[][] => {
    const colors = str.split("-")
    const grid: Cell[][] = []

    // ドットの数を計算します
    const dotsCount = colors.length

    // ドットの数から行の数を計算します
    const rowsCount = Math.sqrt(dotsCount)

    for (let i = 0; i < rowsCount; i++) {
      const row: Cell[] = []
      for (let j = 0; j < rowsCount; j++) {
        row.push({ color: colors[i * rowsCount + j] })
      }
      grid.push(row)
    }

    return grid
  }

  // ドットの大きさを管理するための状態を作成します
  const [dotSize, setDotSize] = useState(32)

  const [grid, setGrid] = useState(
    props.code ? stringToGrid(props.code) : createEmptyGrid(),
  )

  const [colorId, setColorId] = useState("00")

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid]
    // 消しゴムモードが有効なら色をnullに、そうでなければ選択中の色に設定します
    newGrid[rowIndex][colIndex].color = eraserMode ? null : colorId
    setGrid(newGrid)
  }

  const gridToString = (grid: Cell[][]): string => {
    return grid.map((row) => row.map((cell) => cell.color).join("-")).join("-")
  }

  const colorKeys: string[] = [
    "0D",
    "00",
    "10",
    "20",
    "01",
    "11",
    "21",
    "31",
    "02",
    "12",
    "22",
    "32",
    "03",
    "13",
    "23",
    "33",
    "04",
    "14",
    "24",
    "34",
    "05",
    "15",
    "25",
    "35",
    "06",
    "16",
    "26",
    "36",
    "07",
    "17",
    "27",
    "37",
    "08",
    "18",
    "28",
    "38",
    "09",
    "19",
    "29",
    "39",
    "0A",
    "1A",
    "2A",
    "3A",
    "0B",
    "1B",
    "2B",
    "3B",
    "0C",
    "1C",
    "2C",
    "3C",
  ]

  const usedColors = new Set(grid.flat().map((cell) => cell.color))

  const [eraserMode, setEraserMode] = useState(false)

  const handleClearClick = () => {
    setGrid(createEmptyGrid())
  }

  const [selectedSize, setSelectedSize] = useState(8)

  // グリッドのサイズを変更する関数を追加します
  const resizeGrid = (size: number) => {
    setRowsCount(size)
    const newGrid: Cell[][] = []
    for (let i = 0; i < size; i++) {
      const row: Cell[] = []
      for (let j = 0; j < size; j++) {
        row.push({ color: null })
      }
      newGrid.push(row)
    }
    setGrid(newGrid)

    setSelectedSize(size)
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
            {gridToString(grid)}
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
                  colorId === color ? "border-4 border-black" : "",
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
                border: selectedSize === 8 ? "4px solid black" : "none",
              }}
            >
              {"8x8"}
            </Button>
            <Button
              onClick={() => resizeGrid(16)}
              style={{
                border: selectedSize === 16 ? "4px solid black" : "none",
              }}
            >
              {"16x16"}
            </Button>
            <Button
              onClick={() => resizeGrid(32)}
              style={{
                border: selectedSize === 32 ? "4px solid black" : "none",
              }}
            >
              {"32x32"}
            </Button>
            <Button
              onClick={() => resizeGrid(64)}
              style={{
                border: selectedSize === 64 ? "4px solid black" : "none",
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
                border: selectedDotSize === 8 ? "4px solid black" : "none",
              }}
            >
              {"8px"}
            </Button>
            <Button
              onClick={() => resizeDot(16)}
              style={{
                border: selectedDotSize === 16 ? "4px solid black" : "none",
              }}
            >
              {"16px"}
            </Button>
            <Button
              onClick={() => resizeDot(32)}
              style={{
                border: selectedDotSize === 32 ? "4px solid black" : "none",
              }}
            >
              {"32px"}
            </Button>
            <Button
              onClick={() => resizeDot(64)}
              style={{
                border: selectedDotSize === 64 ? "4px solid black" : "none",
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
