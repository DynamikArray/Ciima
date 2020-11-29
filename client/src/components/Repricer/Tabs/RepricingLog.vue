<template>
  <div class="d-flex flex-column align-start justify-start w-100">
    <div class="d-flex align-end justify-start">
      <h1 class="display-1">
        Repricing Log
      </h1>
      <h4 class="ml-1">
        All items
      </h4>
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
import Datatable from "../Datatable/RepricingLogDT";

export default {
  name: "RepricingLog",
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
