import type { Items } from "../types"
import { derived, writable, type Writable } from "svelte/store"

export const kanbanItemsStore: Writable<Items[]>= writable([])

export const kanbanGroups = derived(kanbanItemsStore, ($kanbanItems) => ({
  todo: $kanbanItems.filter((item) => item.status === 'TODO'),
  inProgress: $kanbanItems.filter((item) => item.status === 'IN-PROGRESS'),
  done: $kanbanItems.filter((item) => item.status === 'DONE')
}));