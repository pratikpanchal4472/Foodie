<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/header.svelte";
</script>

<main>
  <Header />
  <div class="container">
    <slot />
  </div>
</main>
