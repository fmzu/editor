"use client"

import { nesColorKeys } from "@/app/_utils/nes-color-keys"
import { xtermColors } from "@/app/_utils/xterm-colors"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  colorIndex: number
  setColorId: (colorId: number) => void
}

export const XtermColorPalette = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-8">
        {xtermColors.slice(0, 16).map((color) => (
          <div key={color} className="flex">
            <Button
              className={cn(
                "w-full h-8 p-0",
                xtermColors[props.colorIndex] === color
                  ? "border-4 border-white"
                  : "",
              )}
              variant={"default"}
              onClick={() => {
                props.setColorId(xtermColors.findIndex((c) => c === color))
              }}
              style={{ backgroundColor: color }}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-6">
        {xtermColors.slice(16).map((color) => (
          <div key={color} className="flex">
            <Button
              className={cn(
                "w-full h-8 p-0",
                xtermColors[props.colorIndex] === color
                  ? "border-4 border-white"
                  : "",
              )}
              variant={"default"}
              onClick={() => {
                props.setColorId(xtermColors.findIndex((c) => c === color))
              }}
              style={{ backgroundColor: color }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
