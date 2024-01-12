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
  resizeGrid: (size: number) => void
  rowsCount: number
}

export const SizeSelectButton = (props: Props) => {
  return (
    <div className="flex space-x-2 overflow-hidden">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="サイズ選択" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              value="8x8"
              onClick={() => {
                props.resizeGrid(8)
              }}
              style={{
                border: props.rowsCount === 8 ? "4px solid white" : "none",
              }}
            >
              {"8x8"}
            </SelectItem>
            <SelectItem
              value="16x16"
              onClick={() => props.resizeGrid(16)}
              style={{
                border: props.rowsCount === 16 ? "4px solid white" : "none",
              }}
            >
              {"16x16"}
            </SelectItem>
            <SelectItem
              value="32x32"
              onClick={() => props.resizeGrid(32)}
              style={{
                border: props.rowsCount === 32 ? "4px solid white" : "none",
              }}
            >
              {"32x32"}
            </SelectItem>
            <SelectItem
              value="64x64"
              onClick={() => props.resizeGrid(64)}
              style={{
                border: props.rowsCount === 64 ? "4px solid white" : "none",
              }}
            >
              {"64x64"}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* ...既存のコード... */}
      {/* サイズを変更するボタンを追加します */}
      {/* <Button
        onClick={() => props.resizeGrid(8)}
        style={{
          border: props.rowsCount === 8 ? "4px solid white" : "none",
        }}
      >
        {"8x8"}
      </Button>
      <Button
        onClick={() => props.resizeGrid(16)}
        style={{
          border: props.rowsCount === 16 ? "4px solid white" : "none",
        }}
      >
        {"16x16"}
      </Button>
      <Button
        onClick={() => props.resizeGrid(32)}
        style={{
          border: props.rowsCount === 32 ? "4px solid white" : "none",
        }}
      >
        {"32x32"}
      </Button>
      <Button
        onClick={() => props.resizeGrid(64)}
        style={{
          border: props.rowsCount === 64 ? "4px solid white" : "none",
        }}
      >
        {"64x64"}
      </Button> */}
    </div>
  )
}
