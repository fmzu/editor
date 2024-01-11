"use client"

import { Button } from "@/components/ui/button"
import { Eraser } from "lucide-react"

type Props = {
  eraserMode: boolean
  setEraserMode: (eraserMode: boolean) => void
}

export const EraserButton = (props: Props) => {
  return (
    <Button
      className="items-stretch space-x-2"
      onClick={() => props.setEraserMode(!props.eraserMode)}
    >
      <Eraser className=" w-4 mr-2" />
      {props.eraserMode
        ? "消しゴムモードをオフにする"
        : "消しゴムモードをオンにする"}
    </Button>
  )
}
