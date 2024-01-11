"use client"

import { EditorCell } from "@/app/_types/editor-cell"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
  grid: EditorCell[][]
  handleCellClick: (rowIndex: number, colIndex: number) => void
  dotSize: number
  colors: Map<string, string>
}

export const GridEditor = (props: Props) => {
  return (
    <Card>
      {props.grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <button
              key={colIndex}
              type="button"
              onClick={() => props.handleCellClick(rowIndex, colIndex)}
              className={cn("border")}
              style={{
                width: `${props.dotSize}px`,
                height: `${props.dotSize}px`,
                backgroundColor:
                  cell.color !== null ? props.colors.get(cell.color) : "white",
              }}
            />
          ))}
        </div>
      ))}
    </Card>
  )
}
