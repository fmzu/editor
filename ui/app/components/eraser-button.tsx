import { Button } from "~/components/ui/button"
import { Eraser } from "lucide-react"

type Props = {
  eraserMode: boolean
  setEraserMode: (eraserMode: boolean) => void
}

export const EraserButton = (props: Props) => {
  return (
    <Button
      variant={props.eraserMode ? "default" : "secondary"}
      className="w-full items-stretch space-x-2"
      onClick={() => props.setEraserMode(!props.eraserMode)}
    >
      <Eraser className=" w-4 mr-2" />
    </Button>
  )
}
