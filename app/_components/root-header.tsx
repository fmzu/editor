"use client"

import { EditorCell } from "@/app/_types/editor-cell"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export const RootHeader = () => {
  return (
    <div className="sticky top-0 bg-card w-full">
      <div className="p-4">
        <h1>{"HASCII"}</h1>
      </div>
      <Separator />
    </div>
  )
}
