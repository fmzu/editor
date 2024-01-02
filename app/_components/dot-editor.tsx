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
  color: string
}

// グリッドの初期状態を作成します
const createEmptyGrid = (): Cell[][] => {
  const rows: Cell[][] = []
  for (let i = 0; i < NUM_ROWS; i++) {
    rows.push([])
    for (let j = 0; j < NUM_COLS; j++) {
      rows[i].push({ color: DEFAULT_COLOR })
    }
  }
  return rows
}

export const DotEditor = () => {
  const [grid, setGrid] = useState(createEmptyGrid())

  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR)

  const COLORS = Array.from(colors.values())

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid]
    newGrid[rowIndex][colIndex].color = selectedColor
    setGrid(newGrid)
  }

  return (
    <div className="flex gap-4 p-4">
      <div className="flex flex-col gap-2 w-40">
        {COLORS.map((color) => (
          <div key={color} className="flex gap-2">
            <div className="w-2" style={{ backgroundColor: color }} />
            <Button
              key={color}
              variant={selectedColor === color ? "default" : "outline"}
              onClick={() => setSelectedColor(color)}
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
                  style={{ backgroundColor: cell.color }}
                />
              ))}
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
