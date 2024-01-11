"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CircleDashed } from "lucide-react"

type Props = {
  handleClearClick: () => void
}

export const ClearButton = (props: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="items-stretch space-x-2">
          <CircleDashed className=" w-4 mr-2" />
          {"クリア"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col space-y-2">
          <div>{"本当にクリアしますか？"}</div>
          <div className="flex justify-end space-x-2">
            <AlertDialogAction onClick={props.handleClearClick}>
              {"はい"}
            </AlertDialogAction>
            <AlertDialogCancel>{"いいえ"}</AlertDialogCancel>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
