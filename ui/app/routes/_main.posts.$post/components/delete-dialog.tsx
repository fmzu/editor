import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

export function DeleteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>{"削除"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"確認"}</DialogTitle>
        </DialogHeader>
        <p>{"本当にこの作品を削除しますか？"}</p>
        <DialogFooter>
          <div className="flex justify-end space-x-2">
            <Button variant={"secondary"}>{"とじる"}</Button>
            <Button type="submit">{"削除"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
