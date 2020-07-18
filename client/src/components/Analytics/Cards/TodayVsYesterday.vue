<template>
  <div
    class="d-flex justify-space-around align-center grey darken-4 w-100 mr-3"
  >
    <div class="d-flex flex-column align-self-stretch mx-5">
      <div class="d-flex flex-column justify-center align-center">
        <h2>Today</h2>
        <v-divider class="w-100 my-1"></v-divider>
      </div>
      <div class="d-flex justify-center align-center align-self-stretch">
        <div v-if="todays" class="text-center">
          <div class="d-flex flex-row align-center justify-center">
            <h4 class="mr-2">Items:</h4>
            <h2>{{ todays.totalItems || 0 }}</h2>
          </div>
          <h2>{{ todays.totalPrice || 0 | currency }}</h2>
        </div>
        <div v-else>
          <h4>No Results</h4>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column align-self-stretch mx-5 align-center">
      <div class="d-flex flex-column justify-center align-center">
        <h2>Yesterday</h2>
        <v-divider class="w-100 my-1"></v-divider>
      </div>
      <div class="d-flex justify-center  align-center align-self-stretch">
        <div v-if="yesterdays" class="text-center">
          <div class="d-flex flex-row align-center justify-center">
            <h4 class="mr-2">Items:</h4>
            <h2>{{ yesterdays.totalItems || 0 }}</h2>
          </div>
          <h2>{{ yesterdays.totalPrice || 0 | currency }}</h2>
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
          {{ dailyDifference.item }}
        </h2>
        <h2
          class="d-flex align-end justify-end ml-10"
          :class="
            dailyItemsPercentageChange > 0 ? 'success--text' : 'red--text'
          "
        >
          {{ dailyItemsPercentageChange }}%
        </h2>
      </div>
      <div
        class="d-flex flex-row align-center justify-space-between px-5 w-100 "
      >
        <h4 class="mr-2">Value:</h4>
        <h2 class="d-flex align-end justify-end">
          {{ dailyDifference.price | currency }}
        </h2>
        <h2
          class="d-flex align-end justify-end ml-10"
          :class="
            dailyPricesPercentageChange > 0 ? 'success-text' : 'red--text'
          "
        >
          {{ dailyPricesPercentageChange }}%
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todays: [Boolean, Object],
    yesterdays: [Boolean, Object]
  },
  computed: {
    dailyDifference() {
      const tItems = this.todays.totalItems;
      const tPrices = this.todays.totalPrice;
      const yItems = this.yesterdays.totalItems;
      const yPrices = this.yesterdays.totalPrice;

      return { item: tItems - yItems || 0, price: tPrices - yPrices || 0 };
    },
    dailyItemsPercentageChange() {
      const tItems = this.todays.totalItems;
      const yItems = this.yesterdays.totalItems;

      if (tItems && yItems) {
        const diff = ((tItems - yItems) / ((tItems + yItems) / 2)) * 100;
        return diff.toFixed(2);
      }
      return 0;
    },
    dailyPricesPercentageChange() {
      const tPrices = this.todays.totalPrice;
      const yPrices = this.yesterdays.totalPrice;

      if (tPrices && yPrices) {
        const diff = ((tPrices - yPrices) / ((tPrices + yPrices) / 2)) * 100;
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
