import { useState } from "react"
import { ReactCanvas } from "~/components/react-canvas"
import { useSpaceKey } from "~/hooks/use-space-key"
import { renderCursor } from "~/lib/canvas/render-cursor"
import { renderDots } from "~/lib/canvas/render-dots"
import { renderGrid } from "~/lib/canvas/render-grid"

type Props = {
  grid: (number | null)[][]
  onChangeCell: (rowIndex: number, colIndex: number) => void
  dotSize: number
}

/**
 * ドット絵を作成するためのキャンバス
 */
export function DotCanvas(props: Props) {
  const [virtualCursor, setVirtualCursor] = useState({ x: 40, y: 40 })

  const [cursor, setCursor] = useState({ x: 40, y: 40 })

  const isActive = useSpaceKey()

  const onDraw = (ctx: CanvasRenderingContext2D) => {
    renderGrid(ctx, { dotSize: props.dotSize, grid: props.grid })
    renderDots(ctx, { dotSize: props.dotSize, grid: props.grid })
    renderCursor(ctx, { x: virtualCursor.x, y: virtualCursor.y })
  }

  const onTouchStart = (canvas: HTMLCanvasElement, x: number, y: number) => {
    setCursor({ x, y })
  }

  const onTouchMove = (canvas: HTMLCanvasElement, x: number, y: number) => {
    onUpdateGrid(canvas)
    setCursor({ x, y })
    const dx = cursor.x - x
    const dy = cursor.y - y
    setVirtualCursor((value) => {
      const x = value.x - dx
      const y = value.y - dy
      if (x < 0 || y < 0) return value
      if (canvas.width < x || canvas.height < y) return value
      return { x, y }
    })
  }

  const onTouchEnd = (canvas: HTMLCanvasElement, x: number, y: number) => {
    // console.log("onTouchEnd", x, y)
  }

  const onUpdateGrid = (canvas: HTMLCanvasElement) => {
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const dotSize = props.dotSize
    const gridSize = props.grid.length * dotSize
    const offsetX = (canvasWidth - gridSize) / 2 + dotSize / 4
    const offsetY = (canvasHeight - gridSize) / 2 + dotSize / 4
    const gridX = Math.floor((virtualCursor.x - offsetX) / dotSize)
    const gridY = Math.floor((virtualCursor.y - offsetY) / dotSize)
    if (gridX < 0 || gridY < 0) return
    if (props.grid.length <= gridY) return
    if (props.grid.length <= gridX) return
    props.onChangeCell(gridY, gridX)
  }

  return (
    <ReactCanvas
      onDraw={onDraw}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    />
  )
}
