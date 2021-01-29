<template>
  <div class="mt-0 white--text">
    <h3>Search Inventory Page</h3>
    <v-divider class="my-1" />
    <p class="pa-2 pb-0">
      A new Inventory Page has been created to better search/filter items by Titles, or Location Code.
    </p>
    <div class="pa-2 grey darken-2">
      <v-img src="@/assets/images/new-inventory-search-screenshot.png" max-height="300" contain />
    </div>
    <p class="pa-1 pt-4">
      To view more information or edit details about any item show on the grid, press the Green edit button in that items
      row.
    </p>
    <p class="pa-1 pt-2">
      <b>
        All items are "locked" on entry and you can view any data you like. To edit an items details you must unlock the item
        using the lock icon in the upper left.
      </b>
    </p>
  </div>
</template>

<script>
export default { name: "whats-new-content" };
</script>
