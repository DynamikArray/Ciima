<template>
  <section>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark class="pt-2">
        <v-card-text>
          <h4 class="text-center mb-2">
            <v-icon class="mr-2">fa fa-search</v-icon>Searching Ebay
          </h4>
          <v-progress-linear
            indeterminate
            color="white"
            class="mt-1"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card class="" :loading="loading">
      <v-card-text class="py-0">
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center">
            <div class="d-flex align-center">
              Filter Out Calculated Shipping:
            </div>

            <div class="d-flex align-center">
              <v-switch
                color="primary"
                class="mb-5"
                v-model="ignoreCalcShipping"
                :label="ignoreCalcShipping ? `Yes` : `No`"
                hide-details
              ></v-switch>
            </div>
          </div>

          <div class="d-flex align-center">
            <h3 class="display-2">
              Avg: {{ calculateAveragePrice | currency }}
            </h3>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-divider class="my-3"></v-divider>

    <V-scroll-y-transition group>
      <v-card
        v-for="item in getFilteredResults"
        class="my-4"
        :key="item.itemId"
      >
        <v-card-text class="pa-1">
          <div class="d-flex grow pa-1">
            <div class="d-flex justify-space-around grow">
              <div class="d-flex shrink mr-1">
                <v-img
                  border
                  contain
                  height="80"
                  width="140"
                  :src="item.galleryURL"
                ></v-img>
              </div>

              <div class="d-flex grow">
                <div class="d-flex flex-column grow">
                  <div class="d-flex">
                    <span class="caption"
                      >Sold {{ item.listingInfo.endTime | date }}</span
                    >
                  </div>
                  <div class="d-flex grow justify-space-between">
                    <div class="d-flex">
                      <h3 class="title my-0">{{ item.title }}</h3>
                    </div>
                  </div>
                  <div class="d-flex">
                    <v-icon
                      left
                      x-small
                      v-if="item.sellerInfo.topRatedSeller"
                      class="mx-1"
                      >fa fa-medal</v-icon
                    >
                    {{ item.sellerInfo.sellerUserName }}
                  </div>
                </div>
              </div>

              <div class="d-flex flex-column justify-center align-end mr-2">
                <div class="d-flex align-center">
                  <h3 class="headline">
                    {{
                      item.sellingStatus.convertedCurrentPrice.amount | currency
                    }}
                  </h3>
                </div>
                <div class="d-flex align-center">
                  <h4 class="subtitle-2">
                    {{ getShippingCost(item.shippingInfo) }}
                    <span class="caption">Shipping</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </V-scroll-y-transition>
  </section>
</template>

<script>
import { mapState } from "vuex";
import EbaySummary from "./EbaySummary";

export default {
  components: {
    EbaySummary
  },
  data: () => ({
    ignoreCalcShipping: false
  }),
  computed: {
    ...mapState({
      results: state => state.ebay.items,
      loading: state => state.ebay.loading
    }),
    getFilteredResults() {
      if (this.ignoreCalcShipping) {
        const filtered = this.results.filter(
          item => item.shippingInfo.shippingType !== "Calculated"
        );
        return filtered;
      }
      return this.results;
    },
    calculateSalesPrices() {
      const prices = this.results.map(item => {
        const { shippingServiceCost } = item.shippingInfo;
        let shipping = 0;

        if (shippingServiceCost && shippingServiceCost.amount)
          shipping = shippingServiceCost.amount;

        const { convertedCurrentPrice } = item.sellingStatus;
        let sold = 0;

        if (convertedCurrentPrice && convertedCurrentPrice.amount)
          sold = convertedCurrentPrice.amount;

        return shipping + sold;
      });
      return prices.sort((a, b) => b - a);
    },
    calculateAveragePrice() {
      if (this.calculateSalesPrices.length === 0) return 0;
      const prices = this.calculateSalesPrices;
      const total = prices.reduce((total, price) => {
        return total + price;
      });

      const avg = total / prices.length;
      return avg;
    }
  },
  methods: {
    getShippingCost(shippingInfo) {
      const { shippingServiceCost, shippingType } = shippingInfo;

      switch (shippingType) {
        case "Flat":
          return this.$options.filters.currency(shippingServiceCost.amount);
          break;
        case "Calculated":
          //tdodo handle this better
          return "Calc'd";
          break;
        case "Free":
          return "Free";
          break;
        default:
          return "n/a";
          break;
      }
    }
  }
};
</script>

<style scoped></style>
