"use client"

import { EditorCell } from "@/app/_types/editor-cell"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
  grid: [string | null, string | null][][]
  onClick: (rowIndex: number, colIndex: number) => void
  dotSize: number
  colors: Map<string, string>
}

export const AsciiCanvas = (props: Props) => {
  return (
    <Card className="overflow-scroll h-full">
      {props.grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <button
              key={colIndex}
              type="button"
              onClick={() => props.onClick(rowIndex, colIndex)}
              className={cn("border")}
              style={{
                minWidth: `${props.dotSize / 2}px`,
                height: `${props.dotSize}px`,
                color: cell[1] !== null ? props.colors.get(cell[1]) : "white",
              }}
            >
              {cell[0]}
            </button>
          ))}
        </div>
      ))}
    </Card>
  )
}
