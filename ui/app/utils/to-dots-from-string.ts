import type { DotCell } from "~/types/dot-cell"

/**
 * 文字列をドット絵に変換する
 * @param text
 * @returns
 */
export const toDotsFromString = (text: string): DotCell[][] => {
  if (text === "") {
    throw new Error("文字列が空です")
  }

  const texts = text.split("-")

  const grid: DotCell[][] = []

  // ドットの数を計算します
  const dotsCount = texts.length

  // ドットの数から行の数を計算します
  const rowsCount = Math.sqrt(dotsCount)

  for (let i = 0; i < rowsCount; i++) {
    const row: DotCell[] = []
    for (let j = 0; j < rowsCount; j++) {
      /**
       * ハイフンで区切った一つ
       */
      const text = texts[i * rowsCount + j]
      row.push({
        color: Number.parseInt(text, 10) || null,
      })
    }
    grid.push(row)
  }

  return grid
}
