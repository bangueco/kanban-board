<script lang="ts">
    import type { Items } from "../../types";
    import { dragItem } from "../actions.svelte";

    let { id, item_name, status }: Items = $props()
</script>

<p class="border p-3 text-center cursor-pointer" use:dragItem data-id={id} data-label={status}>{item_name}</p>