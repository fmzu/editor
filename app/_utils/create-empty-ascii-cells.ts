import { EditorCell } from "@/app/_types/editor-cell"

/**
 * グリッドの初期状態を作成する
 * string | null, string | null: [記号, 色]
 * @param rowsCount 行数
 * @returns
 */
export const createEmptyAsciiGrid = (
  rowsCount: number,
): [string | null, string | null][][] => {
  return Array.from({ length: rowsCount }, () => {
    return Array.from({ length: rowsCount * 2 }, () => {
      return [null, null] as const
    })
  })
}