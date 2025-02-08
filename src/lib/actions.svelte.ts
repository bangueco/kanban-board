import type { Items, Status } from "../types"
import storage from "./storage"
import { kanbanItemsStore } from "./stores.svelte"

export function dragItem(node: HTMLElement) {

  node.draggable = true

  const todoItems = document.querySelector("#todo-items") as HTMLElement
  const inProgressItems = document.querySelector("#in-progress-items") as HTMLElement
  const doneItems = document.querySelector("#done-items") as HTMLElement

  node.addEventListener("dragstart", (event) => {
    event.dataTransfer?.setData("text/plain", node.dataset.id || "");
  });

  const dropHandler = (status: Status) => (event: DragEvent) => {
    event.preventDefault();

    const dropZone = event.target as HTMLElement

    if (dropZone.dataset.id && event.dataTransfer?.getData("text/plain")) {
      const targetId = dropZone.dataset.id
      const currentItemid = event.dataTransfer?.getData("text/plain")
      const items = storage.getLocalStorageItem("kanban-items")

      if (!items) return

      const parsedItems: Items[] = JSON.parse(items)

      const targetIndex = parsedItems.findIndex(item => item.id === parseInt(targetId))
      const currentItemIndex = parsedItems.findIndex(item => item.id === parseInt(currentItemid) )

      const newItems = parsedItems.slice()

      newItems[targetIndex] = parsedItems[currentItemIndex]
      newItems[currentItemIndex] = parsedItems[targetIndex]

      kanbanItemsStore.set(newItems)
    }

    const itemId = event.dataTransfer?.getData("text/plain");
    if (itemId) {
      console.log(`Item ${itemId} dropped at ${status}`);
      kanbanItemsStore.update((items) => {
        const itemIdNumber = parseInt(itemId);
        if (isNaN(itemIdNumber)) return items; // Prevent invalid updates

        const updatedItems = items.map((item) =>
          item.id === itemIdNumber ? { ...item, status } : item
        );

        storage.setLocalStorageItem("kanban-items", JSON.stringify(updatedItems))

        return updatedItems
      });
    }
  };

  const addDropListeners = (element: HTMLElement | null, status: Status) => {
    if (!element) return;
    element.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    element.addEventListener("drop", dropHandler(status));
  };

  addDropListeners(todoItems, "TODO");
  addDropListeners(inProgressItems, "IN-PROGRESS");
  addDropListeners(doneItems, "DONE");

}