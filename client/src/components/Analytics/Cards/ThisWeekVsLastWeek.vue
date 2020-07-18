<template>
  <div
    class="d-flex justify-space-around align-center mx-3 grey darken-4 w-100"
  >
    <div class="d-flex flex-column align-self-stretch mx-5">
      <div class="d-flex flex-column justify-center align-center">
        <h1>This Week</h1>
        <v-divider class="w-100 my-1"></v-divider>
      </div>
      <div class="d-flex justify-center align-center align-self-stretch">
        <div v-if="thisWeeksTotals" class="text-center">
          <div class="d-flex flex-row align-center justify-center">
            <h4 class="mr-2">Items:</h4>
            <h2>{{ thisWeeksTotals.totalItems || 0 }}</h2>
          </div>
          <h2>{{ thisWeeksTotals.totalPrice || 0 | currency }}</h2>
        </div>
        <div v-else>
          <h4>No Results</h4>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column align-self-stretch mx-5 align-center">
      <div class="d-flex flex-column justify-center align-center">
        <h1>Last Week</h1>
        <v-divider class="w-100 my-1"></v-divider>
      </div>
      <div class="d-flex justify-center  align-center align-self-stretch">
        <div v-if="lastWeeksTotals" class="text-center">
          <div class="d-flex flex-row align-center justify-center">
            <h4 class="mr-2">Items:</h4>
            <h2>{{ lastWeeksTotals.totalItems || 0 }}</h2>
          </div>
          <h2>{{ lastWeeksTotals.totalPrice || 0 | currency }}</h2>
        </div>
        <div v-else>
          <h4>No Results</h4>
        </div>
      </div>
    </div>

    <div
      class="d-flex flex-column justify-center align-center align-self-stretch mx-5"
    >
      <div class="d-flex flex-row align-center">
        <h4 class="mr-2">Items:</h4>
        <h2>{{ weeklyDifference.item }}</h2>
      </div>
      <div class="d-flex flex-row align-center">
        <h4 class="mr-2">Value:</h4>
        <h2 class="">
          {{ weeklyDifference.price | currency }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thisWeeks: [Boolean, Array],
    lastWeeks: [Boolean, Array]
  },
  computed: {
    thisWeeksTotals() {
      return this.thisWeeks.reduce((acc, i) => {
        if (acc) {
          if (acc.totalItems && acc.totalPrice) {
            return (acc = {
              totalItems: acc.totalItems + i.totalItems,
              totalPrice: acc.totalPrice + i.totalPrice
            });
          }
        }
        return (acc = { totalItems: i.totalItems, totalPrice: i.totalPrice });
      }, {});
    },
    lastWeeksTotals() {
      return this.lastWeeks.reduce((acc, i) => {
        if (acc) {
          if (acc.totalItems && acc.totalPrice) {
            return (acc = {
              totalItems: acc.totalItems + i.totalItems,
              totalPrice: acc.totalPrice + i.totalPrice
            });
          }
        }
        return (acc = { totalItems: i.totalItems, totalPrice: i.totalPrice });
      }, {});
    },
    weeklyDifference() {
      const twItems = this.thisWeeksTotals.totalItems;
      const twPrices = this.thisWeeksTotals.totalPrice;
      const lwItems = this.lastWeeksTotals.totalItems;
      const lwPrices = this.lastWeeksTotals.totalPrice;

      return { item: twItems - lwItems, price: twPrices - lwPrices };
    }
  }
};
</script>

<style scoped>
.w-50 {
  width: 50%;
}
</style>
