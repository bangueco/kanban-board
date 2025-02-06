<script lang="ts">
    import { ModeWatcher } from "mode-watcher";
    import Input from "./lib/components/ui/input/input.svelte";
    import Button from "./lib/components/ui/button/button.svelte";
    import { onMount } from "svelte";
    import storage from "./lib/storage";
    import type { Items } from "./types";
    import { dragItem } from "./lib/actions.svelte";
    import { kanbanGroups, kanbanItemsStore } from "./lib/stores.svelte";

    let kanbanItemName: string = $state('')

    onMount(() => {
      const kanbanItems = storage.getLocalStorageItem("kanban-items")

      if (!kanbanItems) {
        return storage.setLocalStorageItem("kanban-items", JSON.stringify([]))
      }

      const parsedKanbanItems: Items[] = JSON.parse(kanbanItems)

      kanbanItemsStore.set(parsedKanbanItems)
    })

    const syncKanbanItems = () => {
      storage.setLocalStorageItem("kanban-items", JSON.stringify($kanbanItemsStore))
    }

    const onPressAddItem = () => {
      if (kanbanItemName.length < 1) {
        return alert("Kanban item name input is required.")
      }

      kanbanItemsStore.update((items) => [
        ...items, {id: items.length, item_name: kanbanItemName, status: "TODO"}
      ])
      kanbanItemName = ''
      syncKanbanItems()
    }
</script>

<header class="p-3 text-center">
  <h1 class="text-5xl font-bold">Kanban Board</h1>
</header>

<main class="flex-auto p-2">
  <div class="flex justify-center items-center gap-3 p-3">
    <Input class="max-w-xl" placeholder="Add item name" bind:value={kanbanItemName} />
    <Button onclick={onPressAddItem}>Submit</Button>
  </div>
  <div class="p-3 grid grid-cols-3 gap-10 h-full">
    <div id="todo" class="border p-3 rounded-xl">
      <h1 class="text-3xl font-bold text-red-600 text-center">To Do</h1>
      <div id="todo-items" class="flex flex-col gap-3 pt-12 overflow-scroll h-full">
        {#each $kanbanGroups.todo as todoKanban }
          <div class="border p-3 text-center cursor-pointer" use:dragItem draggable="true" data-id={todoKanban.id} data-label={todoKanban.status}>
            <p>{todoKanban.item_name}</p>
          </div>
        {:else}
          <p class="text-center pt-10">Empty todo tasks.</p>
        {/each}
      </div>
    </div>
    <div id="in-progress" class="border p-3 rounded-xl">
      <h1 class="text-3xl font-bold text-yellow-300 text-center">In Progress</h1>
      <div id="in-progress-items" class="flex flex-col gap-3 pt-12 overflow-scroll h-full">
        {#each $kanbanGroups.inProgress as inProgressKanban }
          <div class="border p-3 text-center cursor-pointer" use:dragItem draggable="true" data-id={inProgressKanban.id} data-label={inProgressKanban.status}>
            <p>{inProgressKanban.item_name}</p>
          </div>
        {:else}
          <p class="text-center pt-10">Empty in progress tasks.</p>
        {/each}
      </div>
    </div>
    <div id="done" class="border p-3 rounded-xl">
      <h1 class="text-3xl font-bold text-green-400 text-center">Done</h1>
      <div id="done-items" class="flex flex-col gap-3 pt-12 overflow-scroll h-full">
        {#each $kanbanGroups.done as doneKanban }
          <div class="border p-3 text-center cursor-pointer" use:dragItem draggable="true" data-id={doneKanban.id} data-label={doneKanban.status}>
            <p>{doneKanban.item_name}</p>
          </div>
        {:else}
          <p class="text-center pt-10">Empty done tasks.</p>
        {/each}
      </div>
    </div>
  </div>
</main>

<ModeWatcher />