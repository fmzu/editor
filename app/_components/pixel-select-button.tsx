"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  resizeDot: (size: number) => void
  selectedDotSize: number
}

export const PixelSelectButton = (props: Props) => {
  return (
    <div className="flex space-x-2 overflow-hidden">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="絵の大きさ" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="8px">{"8px"}</SelectItem>
            <SelectItem value="16px">{"16px"}</SelectItem>
            <SelectItem value="32px">{"32px"}</SelectItem>
            <SelectItem value="64px">{"64px"}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* ...既存のコード... */}
      {/* ドットの大きさを変更するボタンを追加します */}
      {/* <Button
        onClick={() => props.resizeDot(8)}
        style={{
          border: props.selectedDotSize === 8 ? "4px solid white" : "none",
        }}
      >
        {"8px"}
      </Button>
      <Button
        onClick={() => props.resizeDot(16)}
        style={{
          border: props.selectedDotSize === 16 ? "4px solid white" : "none",
        }}
      >
        {"16px"}
      </Button>
      <Button
        onClick={() => props.resizeDot(32)}
        style={{
          border: props.selectedDotSize === 32 ? "4px solid white" : "none",
        }}
      >
        {"32px"}
      </Button>
      <Button
        onClick={() => props.resizeDot(64)}
        style={{
          border: props.selectedDotSize === 64 ? "4px solid white" : "none",
        }}
      >
        {"64px"}
      </Button> */}
    </div>
  )
}
