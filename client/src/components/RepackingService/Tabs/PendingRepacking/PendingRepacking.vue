<template>
  <div class="d-flex flex-column align-start justify-start w-100">
    <div class="d-flex flex-row align-baseline justify-space-between w-100">
      <div class="d-flex align-baseline">
        <h2 class="">
          Items flagged as Pending Repacking
        </h2>
        <h4 class="mx-2">
          If no active listings exist, you may mark the item as Completed.
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
import Datatable from "../../Datatable/dtPendingRepacking";

export default {
  name: "PendingRepacking",
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
