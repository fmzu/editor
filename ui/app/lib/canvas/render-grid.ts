/**
 * グリッドを描画する
 */
export function renderGrid(
  ctx: CanvasRenderingContext2D,
  props: {
    dotSize: number
    grid: (number | null)[][]
  },
) {
  const dotSize = props.dotSize
  const grid = props.grid

  const canvasWidth = ctx.canvas.width
  const canvasHeight = ctx.canvas.height

  const gridSize = grid.length * dotSize
  const offsetX = (canvasWidth - gridSize) / 2
  const offsetY = (canvasHeight - gridSize) / 2

  // グリッドを描画
  for (const [rowIndex, row] of grid.entries()) {
    for (const [colIndex] of row.entries()) {
      ctx.fillStyle = "lightgray"
      ctx.fillRect(
        offsetX + colIndex * dotSize + dotSize,
        offsetY + rowIndex * dotSize + dotSize,
        2,
        2,
      )
    }
  }
}
