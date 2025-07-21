<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { ChevronRight } from 'lucide-svelte';
  interface Props extends HTMLButtonAttributes {
    children: () => any;
    class?: string | undefined;
  }
  let { children, onclick, disabled, type, class: className }: Props = $props();
</script>

<button
  {type}
  {disabled}
  {onclick}
  class={`inline-flex rounded-full border border-secondary-300 px-4 py-3 text-accent-200 hover:scale-105 ${className}`}
>
  {@render children()}
  <ChevronRight class="text-secondary-300 ms-3"/>
</button>
