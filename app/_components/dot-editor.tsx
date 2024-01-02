"use client"

import { colors } from "@/app/_utils/colors"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { toast } from "sonner"

// セルの数と色を定義します
const NUM_ROWS = 10
const NUM_COLS = 10
const DEFAULT_COLOR = "#000000" // 黒

// セルの型を定義します
type Cell = {
  color: string | null
}

// グリッドの初期状態を作成します
const createEmptyGrid = (): Cell[][] => {
  const rows: Cell[][] = []
  for (let i = 0; i < NUM_ROWS; i++) {
    rows.push([])
    for (let j = 0; j < NUM_COLS; j++) {
      rows[i].push({ color: null })
    }
  }
  return rows
}

type Props = {
  code?: string
}

export const DotEditor = (props: Props) => {
  const stringToGrid = (str: string): Cell[][] => {
    const colors = str.split("-")
    const grid: Cell[][] = []

    for (let i = 0; i < 10; i++) {
      const row: Cell[] = []
      for (let j = 0; j < 10; j++) {
        row.push({ color: colors[i * 10 + j] })
      }
      grid.push(row)
    }

    return grid
  }

  const [grid, setGrid] = useState(
    props.code ? stringToGrid(props.code) : createEmptyGrid(),
  )

  const [colorId, setColorId] = useState("00")

  const COLORS = Array.from(colors.keys())

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
                    className={cn("w-8 h-8 border")}
                    style={{
                      backgroundColor:
                        cell.color !== null ? colors.get(cell.color) : "white",
                    }}
                  />
                ))}
              </div>
            ))}
          </Card>
        </div>
        <div className="flex space-x-2 overflow-hidden">
          {/* 消しゴムモードのトグルボタンを追加します */}
          <Button onClick={() => setEraserMode(!eraserMode)}>
            {eraserMode
              ? "消しゴムモードをオフにする"
              : "消しゴムモードをオンにする"}
          </Button>
          {/* ...既存のコード... */}
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
