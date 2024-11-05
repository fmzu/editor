import { Link, useNavigate } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { DotPreviewCanvas } from "~/routes/_main._index/components/dot-preview-canvas"

type Props = {
  onSubmit: () => void
  dots: string
}

export function PostDialog(props: Props) {
  const navigate = useNavigate()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{"投稿"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"投稿"}</DialogTitle>
        </DialogHeader>
        <Card className="bg-gray-200 overflow-hidden shadow-md">
          <div className="overflow-hidden rounded-md">
            <DotPreviewCanvas dots={props.dots} />
          </div>
        </Card>
        <div>
          <p>{"タイトル"}</p>
          <Input />
        </div>
        <DialogFooter>
          <Link to={"/new"}>
            <Button
              type="submit"
              onClick={() => {
                props.onSubmit()
                navigate("/new")
              }}
              className="w-full"
            >
              {"投稿"}
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
