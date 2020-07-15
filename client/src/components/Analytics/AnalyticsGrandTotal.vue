<template>
  <div class="d-flex flex-column justify-start align-center grey darken-4 pa-2">
    <div class="d-flex justify-start align-center">
      <div class="d-flex justify-start align-center">
        <h1 class="mr-4">{{ title }}</h1>
      </div>

      <div class="d-flex justify-start align-center">
        <h5 class="text-center mr-2">
          Total Inventory<br />
          Items Added
        </h5>
        <h1 class="mr-2">
          {{ stockCountTotal }}
        </h1>
      </div>
      <div class="d-flex justify-start align-center mx-4">
        <h5 class="text-center mr-2">
          Total Inventory<br />
          Items Value
        </h5>
        <h1 class="mr-2">
          {{ Number(stockCountValue) | currency }}
        </h1>
      </div>
      <div class="d-flex justify-start align-center mx-4">
        <h5 class="text-center mr-2">
          Average Prices<br />
          Averages Value
        </h5>
        <h1 class="mr-2">
          {{ Number(stockValueAverage) | currency }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newItems: [Boolean, Array],
    existingItems: [Boolean, Array],
    title: [Boolean, String]
  },
  computed: {
    stockCountTotal() {
      const newItemCount = this.newItems.reduce((total, item) => {
        if (item.totalItems) return item.totalItems + total;
        return total;
      }, 0);

      const existingItemsCount = this.existingItems.reduce((total, item) => {
        if (item.totalItems) return item.totalItems + total;
        return total;
      }, 0);

      return newItemCount + existingItemsCount;
    },
    stockCountValue() {
      const newItemValue = this.newItems.reduce((total, item) => {
        if (item.totalPrice) return item.totalPrice + total;
        return total;
      }, 0);

      const existingItemsValue = this.existingItems.reduce((total, item) => {
        if (item.totalPrice) return item.totalPrice + total;
        return total;
      }, 0);

      return newItemValue + existingItemsValue;
    },
    stockValueAverage() {
      const newItemAverage = this.newItems.reduce((t, i) => {
        t = t + i.avgPrice || 0;
        return t;
      }, 0);

      const existingItemAverage = this.existingItems.reduce((t, i) => {
        t = t + i.avgPrice || 0;
        return t;
      }, 0);

      return (
        (newItemAverage + existingItemAverage) /
        (this.existingItems.length + this.newItems.length)
      );
    }
  }
};
</script>

<style scoped></style>
