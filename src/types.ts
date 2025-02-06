export type Status = "TODO" | "IN-PROGRESS" | "DONE"

export type Items = {
  id: number
  item_name: string
  status: Status
}