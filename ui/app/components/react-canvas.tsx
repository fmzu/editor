import { useEffect, useRef } from "react"
import { xtermColors } from "~/utils/xterm-colors"

type Props = {
  grid: (number | null)[][]
  width: number
  onChange?(rowIndex: number, colIndex: number, x: number, y: number): void
  onMouseDown?(): void
  onMouseUp?(): void
  onMouseLeave?(): void
}

export function ReactCanvas(props: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    canvas.width = props.width
    canvas.height = props.width
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const cellSize = props.width / props.grid.length
    for (const [rowIndex, row] of props.grid.entries()) {
      for (const [colIndex, colorIndex] of row.entries()) {
        if (colorIndex === null) continue
        ctx.fillStyle = xtermColors[colorIndex]
        ctx.fillRect(
          colIndex * cellSize,
          rowIndex * cellSize,
          cellSize,
          cellSize,
        )
      }
    }
  }, [props.grid])

  return (
    <canvas
      ref={ref}
      className={"touch-none"}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseLeave={props.onMouseLeave}
      onMouseMove={(event) => {
        if (props.onChange === undefined) return
        const gridSide = props.grid.length
        const rect = event.currentTarget.getBoundingClientRect()
        const scaleX = event.currentTarget.width / rect.width
        const scaleY = event.currentTarget.height / rect.height
        const x = (event.clientX - rect.left) * scaleX
        const y = (event.clientY - rect.top) * scaleY
        const colIndex = Math.floor(x / (props.width / gridSide))
        const rowIndex = Math.floor(y / (props.width / gridSide))
        if (
          colIndex < 0 ||
          colIndex >= gridSide ||
          rowIndex < 0 ||
          rowIndex >= gridSide
        )
          return
        props.onChange(rowIndex, colIndex, x, y)
      }}
    />
  )
}
