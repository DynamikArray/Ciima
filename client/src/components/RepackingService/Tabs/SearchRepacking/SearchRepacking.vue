<template>
  <div class="d-flex flex-column align-start justify-start w-100">
    <div class="d-flex flex-row align-baseline justify-space-between w-100">
      <div class="d-flex align-baseline">
        <h2 class="">
          Per Comic Price Of Items In Inventory
        </h2>
        <h4 class="mx-2">Search items and submit for Repacking.</h4>
      </div>

      <div>
        <v-btn color="primary" @click="printGrid"><v-icon class="mr-2">fa fa-print</v-icon>Print</v-btn>
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
import Datatable from "../../Datatable/dtSearchRepacking";
export default {
  name: "dtSearchRepacking",
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
  },
  methods: {
    printGrid() {
      this.$emit("printGrid");
    }
  }
};
</script>

<style scoped></style>
