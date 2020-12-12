<template>
  <div class="mt-0 white--text">
    <h3 class="mr-2">GTC - Decline Price Field</h3>
    <v-divider class="my-1" />
    <p class=" pa-2">
      GTC's have been givine a new field "Decline Price". Use this to set the
      price at which Ebay will automatically decline any best offers.
      <br />
      <br />
      <em
        >You can in-line edit this value like any other draft field, but there
        is not yet a way to update an items value in linnworks.</em
      >
    </p>
    <h3>GTC Sold Report</h3>
    <v-divider class="my-1" />
    <p class="pa-2 pb-4">
      With the addition of GTC's listing types, we added an additional tab to
      the reports screen. You should now see a GTC tab that provides GTC sold
      items over a given period.
    </p>
    <h3>Repricing Log</h3>
    <v-divider class="my-1" />
    <p class="pa-2 pb-4">
      There is a a new tab called Repricing Log in the Repricing Service that
      contains a Datatable of all the repricing we do. Inventory Title, Old
      Price, New Price and Date Updated are all displayed.
    </p>
  </div>
</template>

<script>
export default { name: "whats-new-content" };
</script>
