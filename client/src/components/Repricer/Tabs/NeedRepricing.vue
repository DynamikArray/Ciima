<template>
  <div class="d-flex flex-column align-start justify-start w-100">
    <div class="d-flex align-start justify-start w-100">
      <h1 class="display-1">
        Items Relisted in the Last 24 hours that Need Repricing
      </h1>
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
import Datatable from "../Datatable/NeedRepricingDT";

export default {
  name: "NeedRepricing",
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
