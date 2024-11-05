import { Card, CardContent } from "~/components/ui/card"
import { DeleteDialog } from "~/routes/_main.posts.$post._index/components/delete-dialog"

export function SettingsCard() {
  return (
    <Card className="bg-border">
      <CardContent className="p-4 space-y-2">
        <p className="text-xs opacity-70">
          {"この項目はあなただけに見えています"}
        </p>
        <DeleteDialog />
      </CardContent>
    </Card>
  )
}
