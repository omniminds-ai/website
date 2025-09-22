<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Check } from 'lucide-svelte';

  interface Props extends HTMLInputAttributes {
    class?: string;
    variant?: 'dark' | 'light';
    validation:  RegExp | null;
    validationErrorMessage? : string | null;
  }

  let {
    class: className = '',
    variant = 'dark',
    value = $bindable(''),
    validation = null,
    validationErrorMessage ='',
    ...rest
  }: Props = $props();

  const variantClasses = $derived.by(() => {
    let classes = '';
    switch (variant) {
      case 'dark':
        classes +=
          'bg-[#2D3539] text-gray-400 border-gray-700 focus:ring-secondary-300 focus:border-secondary-300';
        break;
      case 'light':
        classes +=
          'bg-gray-100 text-black border-gray-300 focus:ring-secondary-300 focus:border-secondary-300';
        break;

      default:
        break;
    }
    return classes;
  });

  const valid = $derived.by(() => validation && validation.test(value));

</script>

  <div class="{variantClasses} flex items-center justify-between py-2 px-3 border focus:outline-none focus:ring transition-all {className}">
    <input
      class="w-full {variantClasses}"
      bind:value
      {...rest} />
    {#if validation && valid}
      <Check class="text-green-500"></Check>
    {/if}
  </div>
  {#if validation && !valid}
    <div class="mt-1 text-red-400 text-sm">Invalid input: {validationErrorMessage}</div>
  {/if}