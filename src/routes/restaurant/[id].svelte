<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ page, fetch }) => {
    console.log(page);
    const id = page.params.id;
    let restaurant, menuItems;
    const restaurantResponse = await fetch(`/restaurants.json?rid=${id}`);
    if (restaurantResponse.ok) {
      restaurant = await restaurantResponse.json();
    }

    const menuItemsResponse = await fetch(`/menuitems.json?rid=${id}`);
    if (menuItemsResponse.ok) {
      menuItems = await menuItemsResponse.json();
    }

    if (restaurant && menuItems) {
      return {
        props: {
          restaurant,
          menuItems,
        },
      };
    } else {
      return {
        error: new Error(
          "Error while populating the page. Something went wrong."
        ),
      };
    }
  };
</script>

<script lang="ts">
  export let restaurant: Restaurant;
  export let menuItems: MenuItem[] = [];

  let categories = [
    ...new Set(menuItems.map((item: MenuItem) => item.category)),
  ].join(", ");
</script>

<div class="mx-3 px-3">
  <nav aria-label="breadcrumb my-3">
    <ol class="breadcrumb mt-3">
      <li class="breadcrumb-item"><a href="/">Home</a></li>
      <li class="breadcrumb-item active" aria-current="page">{restaurant?.name}</li>
    </ol>
  </nav>
  <div class="card my-3">
    <div class="row g-0">
      <div class="col-md-3">
        <img
          src={restaurant?.image}
          class="rounded-start"
          alt={restaurant?.name}
          height="230"
          width="230"
        />
      </div>
      <div class="col-md-9">
        <div class="card-body mt-3">
          <h5 class="card-title">{restaurant?.name}</h5>
          <p class="card-text text-muted mb-1">
            <em>{categories}</em><br />
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
  </div>
  <h6 class="text-center my-4">Menu</h6>
  <ul class="list-group">
    {#each menuItems as menuItem}
      <li
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div class="ms-2 me-auto">
          <div class="fw-bold">{menuItem.name}</div>
          {menuItem.category}
        </div>
        <span class="badge bg-primary rounded-pill"
          >&#8377; {menuItem.unitPrice}</span
        >
      </li>
    {/each}
  </ul>
</div>
