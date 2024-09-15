import { useState } from "react"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { createEmptyGrid } from "~/utils/create-empty-cells"
import { toDotsFromString } from "~/utils/to-dots-from-string"
import { xtermColors } from "~/utils/xterm-colors"

type Props = {
  dots: string
}

export function DotPreviewCanvas(props: Props) {
  const grid = toDotsFromString(props.dots)

  return (
    <div className="h-full">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex.toString()} className="flex">
          {row.map((cell, colIndex) => (
            <div
              className="w-full flex-1 aspect-[1/1]"
              key={colIndex.toString()}
              style={{
                backgroundColor:
                  cell.color !== null ? xtermColors[cell.color] : "white",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
