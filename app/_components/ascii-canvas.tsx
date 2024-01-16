"use client"

import { EditorCell } from "@/app/_types/editor-cell"
import { xtermColors } from "@/app/_utils/xterm-colors"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
  grid: [string | null, number | null][][]
  onClick: (rowIndex: number, colIndex: number) => void
  dotSize: number
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
                color: cell[1] !== null ? xtermColors[cell[1]] : "white",
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
