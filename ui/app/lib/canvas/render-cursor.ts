export function renderCursor(
  ctx: CanvasRenderingContext2D,
  props: {
    x: number
    y: number
  },
) {
  ctx.save()
  ctx.translate(props.x, props.y)
  ctx.fillStyle = "gray"
  ctx.fillRect(0, 0, 8, 8)
  ctx.restore()
}
