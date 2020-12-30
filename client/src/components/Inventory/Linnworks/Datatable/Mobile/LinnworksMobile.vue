<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="py-5" :key="`transition_${keyString}`" :class="fontClass">
      <div class="d-flex flex-column align-start justify-start">
        <div class="d-flex align-start justify-start body-1">
          {{ item.ItemTitle }}
        </div>
        <div class="d-flex align-start justify-space-between w-100">
          <div class="d-flex flex-column w-100">
            <div class="d-flex w-100 align-center justify-space-between">
              <div class="d-flex align-center justify-center mt-1">
                <div class="pa-2 text-center">{{ showRetailPrice }}</div>
              </div>
              <div class="d-flex align-center justify-center mt-1">
                <div class="pa-2 text-center">
                  Listing: {{ item.ListingPrice | currency }}
                </div>
              </div>
              <div class="d-flex align-center justify-center mt-1">
                <div class="pa-2 text-center">
                  Start: {{ item.StartPrice | currency }}
                </div>
              </div>
              <div class="d-flex align-center justify-center mt-1">
                <div class="pa-2 text-center">
                  Decline: {{ item.DeclinePrice | currency }}
                </div>
              </div>
            </div>

            <div class="d-flex w-100 align-center justify-start mb-1">
              <div class="d-flex align-start justify-center">
                <v-chip color="grey darken-4" class="caption">
                  Qty: {{ item.Quantity }}
                </v-chip>
              </div>

              <div class="d-flex align-start justify-center px-2">
                <h3 class="textShadow">IN</h3>
              </div>

              <div class="d-flex align-start justify-center">
                <v-chip color="grey darken-4" class="caption">
                  {{ item.BinRackNumber }}
                </v-chip>
              </div>
            </div>
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
