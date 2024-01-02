"use client"

import { colors } from "@/app/_utils/colors"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"

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

  const [colorId, setColorId] = useState("04")

  const COLORS = Array.from(colors.keys())

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid]
    newGrid[rowIndex][colIndex].color = colorId
    setGrid(newGrid)
  }

  const gridToString = (grid: Cell[][]): string => {
    return grid.map((row) => row.map((cell) => cell.color).join("-")).join("-")
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2 overflow-hidden">
        <Card className="flex-1 overflow-hidden items-center">
          <pre
            className="whitespace-nowrap overflow-hidden h-full"
            style={{ lineHeight: "2.5rem" }}
          >
            {gridToString(grid)}
          </pre>
        </Card>
        <Button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          {"コピー"}
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map((color) => (
            <div key={color} className="flex gap-2">
              <div
                className="w-2"
                style={{ backgroundColor: colors.get(color) }}
              />
              <Button
                key={color}
                variant={colorId === color ? "default" : "outline"}
                onClick={() => setColorId(color)}
              >
                {color}
              </Button>
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
      </div>
    </div>
  )
}
