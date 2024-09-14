import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { xtermColors } from "~/utils/xterm-colors"

type Props = {
  colorIndex: number | null
  setColorId: (colorId: number) => void
}

/**
 * アスキーアート用のカラーパレット
 * @param props
 * @returns
 */
export const DotXtermColorPalette = (props: Props) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-8 gap-1">
        {xtermColors.slice(0, 16).map((color) => (
          <div key={color} className="flex">
            <Button
              className={cn(
                "w-full h-8 p-0",
                props.colorIndex !== null &&
                  props.colorIndex !== undefined &&
                  xtermColors[props.colorIndex] === color
                  ? "border-2 border-black"
                  : "border-2 border-gray-100",
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
      {/* <div className="grid grid-cols-6">
        {xtermColors.slice(16).map((color) => (
          <div key={color} className="flex">
            <Button
              className={cn(
                "w-full h-8 p-0",
                props.colorIndex && xtermColors[props.colorIndex] === color
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
      </div> */}
    </div>
  )
}
