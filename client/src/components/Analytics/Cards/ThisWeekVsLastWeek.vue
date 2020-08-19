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
        <div v-if="thisWeeks" class="text-center">
          <div class="d-flex flex-row align-center justify-center">
            <h4 class="mr-2">Items:</h4>
            <h2>{{ thisWeeks.totalItems || 0 }}</h2>
          </div>
          <h2>{{ thisWeeks.totalPrice || 0 | currency }}</h2>
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
        <div v-if="lastWeeks" class="text-center">
          <div class="d-flex flex-row align-center justify-center">
            <h4 class="mr-2">Items:</h4>
            <h2>{{ lastWeeks.totalItems || 0 }}</h2>
          </div>
          <h2>{{ lastWeeks.totalPrice || 0 | currency }}</h2>
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
        <h2
          class="d-flex align-center justify-start"
          :class="`${weeklyItemsColorsAndIcon.color}--text`"
        >
          {{ weeklyDifference.item }}
        </h2>
        <h2
          class="d-flex align-end justify-end ml-10"
          :class="`${weeklyItemsColorsAndIcon.color}--text`"
        >
          {{ weeklyItemsPercentageChange }}
          <div class="body-1 mx-1 pb-1">%</div>
        </h2>
        <v-icon :color="weeklyItemsColorsAndIcon.color"
          >fa {{ weeklyItemsColorsAndIcon.icon }}</v-icon
        >
      </div>
      <div
        class="d-flex flex-row align-center justify-space-between px-5 w-100 "
      >
        <h4 class="mr-2">Value:</h4>
        <h2
          class="d-flex align-end justify-end"
          :class="`${weeklyPricesColorsAndIcon.color}--text`"
        >
          {{ weeklyDifference.price | currency }}
        </h2>
        <h2
          class="d-flex align-end justify-end ml-10"
          :class="`${weeklyPricesColorsAndIcon.color}--text`"
        >
          {{ weeklyPricesPercentageChange }}
          <div class="body-1 mx-1 pb-1">%</div>
        </h2>
        <v-icon :color="weeklyPricesColorsAndIcon.color"
          >fa {{ weeklyPricesColorsAndIcon.icon }}</v-icon
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thisWeeks: [Boolean, Object],
    lastWeeks: [Boolean, Object]
  },
  computed: {
    weeklyDifference() {
      const twItems = this.thisWeeks.totalItems;
      const twPrices = this.thisWeeks.totalPrice;
      const lwItems = this.lastWeeks.totalItems;
      const lwPrices = this.lastWeeks.totalPrice;

      return { item: twItems - lwItems, price: twPrices - lwPrices };
    },
    weeklyItemsPercentageChange() {
      const twItems = this.thisWeeks.totalItems;
      const lwItems = this.lastWeeks.totalItems;
      if (twItems && lwItems) {
        const diff = ((twItems - lwItems) / ((twItems + lwItems) / 2)) * 100;
        return diff.toFixed(2);
      }
      return 0;
    },
    weeklyPricesPercentageChange() {
      const twPrices = this.thisWeeks.totalPrice;
      const lwPrices = this.lastWeeks.totalPrice;

      if (twPrices && lwPrices) {
        const diff =
          ((twPrices - lwPrices) / ((twPrices + lwPrices) / 2)) * 100;
        return diff.toFixed(2);
      }
      return 0;
    },
    weeklyItemsColorsAndIcon() {
      if (this.weeklyItemsPercentageChange > 0) {
        return {
          color: "green",
          icon: "fa-arrow-up"
        };
      }
      return {
        color: "red",
        icon: "fa-arrow-down"
      };
    },
    weeklyPricesColorsAndIcon() {
      if (this.weeklyPricesPercentageChange > 0) {
        return {
          color: "green",
          icon: "fa-arrow-up"
        };
      }
      return {
        color: "red",
        icon: "fa-arrow-down"
      };
    }
  }
};
</script>

<style scoped>
.w-50 {
  width: 50%;
}
</style>
