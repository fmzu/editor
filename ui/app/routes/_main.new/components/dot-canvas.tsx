import { cn } from "~/lib/utils"
import { xtermColors } from "~/utils/xterm-colors"

type Props = {
  grid: (number | null)[][]
  onClick: (rowIndex: number, colIndex: number) => void
  dotSize: number
}
/**
 * アスキーアートのキャンバス
 * @param props
 * @returns
 */
export const DotCanvas = (props: Props) => {
  return (
    <div className="h-full">
      {props.grid.map((row, rowIndex) => (
        <div key={rowIndex.toString()} className="flex">
          {row.map((cell, colIndex) => (
            <button
              key={colIndex.toString()}
              type="button"
              onClick={() => {
                props.onClick(rowIndex, colIndex)
              }}
              className={cn("border")}
              style={{
                minWidth: `${props.dotSize}px`,
                height: `${props.dotSize}px`,
                backgroundColor: cell !== null ? xtermColors[cell] : "white",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
