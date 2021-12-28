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
    <div class="card-body">
      <a class="text-decoration-none" href={`/restaurant/${restaurant.id}`}>
        <h5 class="card-title">{restaurant?.name}</h5>
      </a>
    </div>
  </div>
</div>
