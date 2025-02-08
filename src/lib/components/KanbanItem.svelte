<script lang="ts">
    import type { Items } from "../../types";
    import { dragItem } from "../actions.svelte";
    import storage from "../storage";
    import { kanbanItemsStore } from "../stores.svelte";

    let { id, item_name, status }: Items = $props()

    const onPressDelete = (id: number) => {
        kanbanItemsStore.update((items) => {
            const newItems = items.filter(item => item.id !== id)

            return newItems
        })

        storage.setLocalStorageItem("kanban-items", JSON.stringify($kanbanItemsStore))
    }
</script>

<div class="border p-3 cursor-pointer relative flex justify-between" use:dragItem data-id={id} data-label={status}>
    <p>{item_name}</p>
    <div>
        <button class="text-red-700" onclick={() => onPressDelete(id)}>Delete</button>
    </div>
</div>