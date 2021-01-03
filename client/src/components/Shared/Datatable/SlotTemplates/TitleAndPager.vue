<template>
  <div
    id="customHeaderSlotWrapper"
    class="d-flex align-center justify-space-between grey darken-4"
  >
    <h3 class="title white--text ml-3">
      {{ title }}
    </h3>
    <v-data-footer
      class="customPagerInHeader pa-1"
      :pagination="pagination"
      :options="options"
      @update:options="updateOptions"
      :items-per-page-options="footerProps['items-per-page-options']"
      items-per-page-text="$vuetify.dataTable.itemsPerPageText"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: { type: [String] },
    pagination: { type: [Object] },
    options: { type: [Object] },
    updateOptions: { type: [Function] },
    footerProps: { type: Object }
  }
};
</script>

<style>
#customHeaderSlotWrapper .v-data-footer.customPagerInHeader {
  border-top: 0px !important;
}

#customHeaderSlotWrapper .v-data-footer__select .v-select {
  margin: 0px 10px !important;
}
</style>
