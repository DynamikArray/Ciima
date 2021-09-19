<template>
  <div class="d-flex flex-column align-start justify-start w-100">
    <div class="d-flex flex-row align-baseline justify-space-between w-100">
      <div class="d-flex align-baseline">
        <h2 class="">
          Items flagged as Completed Repacking
        </h2>
        <h4 class="mx-2">
          These are items you have removed from Ebay listings and sent to repacking for Amazon.
        </h4>
      </div>

      <div>
        &nbsp;
      </div>
    </div>

    <div class="w-100">
      <v-divider class="my-1" />
    </div>

    <div class="d-flex align-start justify-start w-100">
      <Datatable :items="items" :loading="loading" />
    </div>
  </div>
</template>

<script>
import Datatable from "../../Datatable/dtCompletedRepacking";

export default {
  name: "CompletedRepacking",
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    }
  },
  components: {
    Datatable
  }
};
</script>

<style scoped></style>
