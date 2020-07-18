<template>
  <div
    class="d-flex justify-space-around align-center mx-3 grey darken-4 w-100"
  >
    <div class="d-flex flex-column align-self-stretch mx-5">
      <div class="d-flex flex-column justify-center align-center">
        <h1>Today</h1>
        <v-divider class="w-100 my-1"></v-divider>
      </div>
      <div class="d-flex justify-center  align-center align-self-stretch">
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

    <div class="d-flex flex-column align-self-stretch mx-5">
      <div class="d-flex flex-column justify-start align-center">
        <h1>Yesterday</h1>
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

    <div
      class="d-flex flex-column justify-center align-center align-self-stretch mx-5"
    >
      <div class="d-flex flex-row align-center">
        <h4 class="mr-2">Items:</h4>
        <h2>{{ dailyDifference.item }}</h2>
      </div>
      <div class="d-flex flex-row align-center">
        <h4 class="mr-2"></h4>
        <h2 class="">
          {{ dailyDifference.price | currency }}
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
    }
  }
};
</script>

<style scoped>
.w-50 {
  width: 50%;
}
</style>
