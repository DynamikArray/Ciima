<template>
  <div class="w-100 pa-2">
    <div class="d-flex flex-row align-center w-100" :class="alignClass">
      <h5 class="mb-2">
        <v-icon small class="mr-1">fa fa-dollar-sign</v-icon>
        Prices:
      </h5>
    </div>

    <div class="d-flex flex-row flex-wrap align-center justify-start w-100">
      <div
        class="d-flex flex-column align-center justify-center mx-3 mb-1"
        v-for="price in prices"
      >
        <h5 class="caption">
          {{ price.grade }}
        </h5>
        <h5 class="caption">
          {{ price.price | currency }}
        </h5>
      </div>
    </div>

    <div v-if="!prices.length">
      <h5>No price information found</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alignClass: {
      type: String,
      default: "justify-start"
    },
    prices: [Boolean, Array]
  }
};
</script>

<style scoped></style>
