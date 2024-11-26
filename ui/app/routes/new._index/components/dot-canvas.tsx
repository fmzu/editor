import { useEffect, useState } from "react"
import { CanvasGrid } from "~/components/canvas-grid"
import { ReactCanvas } from "~/components/react-canvas"

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
      <CanvasGrid grid={props.grid} dotSize={props.dotSize} />
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
