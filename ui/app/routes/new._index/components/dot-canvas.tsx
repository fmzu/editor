import { useEffect, useState } from "react"
import { ReactCanvas } from "~/components/react-canvas"
import { cn } from "~/lib/utils"
import { xtermColors } from "~/utils/xterm-colors"

type Props = {
  grid: (number | null)[][]
  onClick: (rowIndex: number, colIndex: number) => void
  dotSize: number
  isSpacePressed: boolean
  onPressSpace: (isSpacePressed: boolean) => void
}
/**
 * ドット絵を作成するためのキャンバス
 * @param props
 * @returns
 */
export const DotCanvas = (props: Props) => {
  const [isMouseDown, setIsMouseDown] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        props.onPressSpace(true)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        props.onPressSpace(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseDown = () => {
    setIsMouseDown(true)
  }

  const handleMouseMove = (rowIndex: number, colIndex: number) => {
    if (isMouseDown === false && props.isSpacePressed === false) return
    props.onClick(rowIndex, colIndex)
  }

  return (
    <div
      className={"relative"}
      style={{
        height: props.dotSize * props.grid.length,
        width: props.dotSize * props.grid.length,
      }}
    >
      <div className={"absolute pointer-events-none"}>
        {props.grid.map((row, rowIndex) => (
          <div key={rowIndex.toString()} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex.toString()}
                className={cn("border")}
                style={{
                  minWidth: `${props.dotSize}px`,
                  height: `${props.dotSize}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <ReactCanvas
        width={props.dotSize * props.grid.length}
        grid={props.grid}
        onChange={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  )
}
