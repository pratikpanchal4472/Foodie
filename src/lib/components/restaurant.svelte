<script lang="ts">
  export let restaurant;
</script>

<div class="col">
  <div class="card">
    <img
      src={restaurant?.image}
      class="card-img-top"
      alt={restaurant?.name}
      height="300px"
    />
    <div class="card-body p-2">
      <h5 class="card-title mb-0">
        <a class="text-decoration-none" href={`/restaurant/${restaurant.id}`}
          >{restaurant?.name}</a
        >
      </h5>
      <p class="card-text text-muted mb-1">
        {restaurant?.location}
      </p>
      <p class="card-text">
        Ratings:
        {#each [1, 2, 3, 4, 5] as rating}
          <i
            class="bi mr-1 inline-block text-warning"
            class:bi-star={restaurant?.rating < rating}
            class:bi-star-fill={restaurant?.rating >= rating}
          />
        {/each}
      </p>
    </div>
  </div>
</div>
