<template>
  <div
    class="d-flex justify-space-around align-center  grey darken-4 w-100 ml-3"
  >
    <div class="d-flex flex-column align-self-stretch mx-5">
      <div class="d-flex flex-column justify-center align-center">
        <h2>This Week</h2>
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
        <h2>Last Week</h2>
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

    <div class="d-flex flex-column justify-center align-end align-self-stretch">
      <div class="d-flex flex-column justify-center align-center w-100">
        <h2 class="">Change</h2>
        <v-divider class="w-100 my-1"></v-divider>
      </div>
      <div
        class="d-flex flex-row align-center justify-space-between  px-5 w-100"
      >
        <h4 class="d-flex mr-2">Items:</h4>
        <h2 class="d-flex align-center justify-start">
          {{ weeklyDifference.item }}
        </h2>
        <h2
          class="d-flex align-end justify-end ml-10"
          :class="
            weeklyItemsPercentageChange > 0 ? 'success--text' : 'red--text'
          "
        >
          {{ weeklyItemsPercentageChange }}%
        </h2>
      </div>
      <div
        class="d-flex flex-row align-center justify-space-between px-5 w-100 "
      >
        <h4 class="mr-2">Value:</h4>
        <h2 class="d-flex align-end justify-end">
          {{ weeklyDifference.price | currency }}
        </h2>
        <h2
          class="d-flex align-end justify-end ml-10"
          :class="
            weeklyPricesPercentageChange > 0 ? 'success--text' : 'red--text'
          "
        >
          {{ weeklyPricesPercentageChange }}%
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
    },
    weeklyItemsPercentageChange() {
      const twItems = this.thisWeeksTotals.totalItems;
      const lwItems = this.lastWeeksTotals.totalItems;
      if (twItems && lwItems) {
        const diff = ((twItems - lwItems) / ((twItems + lwItems) / 2)) * 100;
        return diff.toFixed(2);
      }
      return 0;
    },
    weeklyPricesPercentageChange() {
      const twPrices = this.thisWeeksTotals.totalPrice;
      const lwPrices = this.lastWeeksTotals.totalPrice;

      if (twPrices && lwPrices) {
        const diff =
          ((twPrices - lwPrices) / ((twPrices + lwPrices) / 2)) * 100;
        return diff.toFixed(2);
      }
      return 0;
    }
  }
};
</script>

<style scoped>
.w-50 {
  width: 50%;
}
</style>
