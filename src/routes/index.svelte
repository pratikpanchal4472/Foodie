<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    const res = await fetch("/restaurants.json");
    if (res.ok) {
      const todos = await res.json();
      return {
        props: { todos },
      };
    }
    const { message } = await res.json();
    return {
      error: new Error(message),
    };
  };
</script>

<script lang="ts">
  export let restaurants: Restaurant[] = [];
</script>

<h1 class="text-center">Restaurants</h1>
{#each restaurants as restaurant}
  {restaurant.name}
{/each}
