<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    const res = await fetch("/restaurants.json");
    if (res.ok) {
      const restaurants = await res.json();
      console.log(restaurants);
      return {
        props: { restaurants },
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

<h4 class="text-center my-3">Restaurants</h4>

<div class="row row-cols-1 row-cols-md-4 g-4">
  {#each restaurants as restaurant}
    <div class="col">
      <div class="card">
        <img
          src={restaurant.image}
          class="card-img-top"
          alt={restaurant.name}
          height="300px"
        />
        <div class="card-body">
          <h5 class="card-title">{restaurant.name}</h5>
        </div>
      </div>
    </div>
  {/each}
</div>
