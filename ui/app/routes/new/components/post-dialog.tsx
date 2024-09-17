import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"

type Props = {
  onSubmit: () => void
}

export function PostDialog(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{"投稿"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"投稿"}</DialogTitle>
        </DialogHeader>
        <p>{"ここに投稿したいドット絵"}</p>
        <div>
          <p>{"タイトル"}</p>
          <Input />
        </div>
        <DialogFooter>
          <Link to={"/new"}>
            <Button type="submit" onClick={props.onSubmit}>
              {"投稿"}
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
