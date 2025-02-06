<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
    import Input from "./lib/components/ui/input/input.svelte";
    import Button from "./lib/components/ui/button/button.svelte";
</script>

<header class="p-3 text-center">
  <h1 class="text-5xl font-bold">Kanban Board</h1>
</header>

<main class="flex-auto p-2">
  <form class="flex justify-center items-center gap-3 p-3">
    <Input class="max-w-xl" />
    <Button>Submit</Button>
  </form>
  <div class="p-3 grid grid-cols-3 gap-10 h-full">
    <div id="todo" class="border p-3 rounded-xl">
      <h1 class="text-3xl font-bold text-red-600 text-center">To Do</h1>
      <div id="todo-items">

      </div>
    </div>
    <div id="in-progress" class="border p-3 rounded-xl">
      <h1 class="text-3xl font-bold text-yellow-300 text-center">In Progress</h1>
      <div id="in-progress">

      </div>
    </div>
    <div id="done" class="border p-3 rounded-xl">
      <h1 class="text-3xl font-bold text-green-400 text-center">Done</h1>
      <div id="done-items">

      </div>
    </div>
  </div>
</main>

<ModeWatcher />
<slot />