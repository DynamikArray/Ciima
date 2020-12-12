<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="" :key="`transition_${keyString}`" :class="fontClass">
      <div class="d-flex flex-column align-start justify-start">
        <div class="d-flex align-start justify-start body-1">
          {{ item.ItemTitle }}
        </div>
        <div class="d-flex align-start justify-space-between mt-1 w-100">
          <div class="d-flex align-start justify-start mt-1">
            <v-chip color="grey darken-4" class="caption">{{
              item.BinRackNumber
            }}</v-chip>
          </div>
          <div class="d-flex align-start justify-start mt-1">
            <div class="pa-2">Qty: {{ item.Quantity }}</div>
          </div>
          <div class="d-flex align-start justify-start mt-1">
            <div class="pa-2">{{ showRetailPrice }}</div>
          </div>
          <div class="d-flex align-start justify-start mt-1">
            <div class="pa-2">Listing: {{ item.ListingPrice | currency }}</div>
          </div>
        </div>
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    item: { type: [Object] },
    keyString: { type: [String] },
    fontClass: {
      type: [String],
      default: "body-2"
    }
  },
  computed: {
    showRetailPrice() {
      if (this.item.CategoryName.toUpperCase() == "EBAY-LOTS") {
        return "Retail: N/A";
      }
      return `Retail: ${this.$options.filters.currency(this.item.RetailPrice)}`;
    }
  }
};
</script>

<style scoped></style>
