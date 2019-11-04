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

    <v-row>
      <v-col cols="6">
        <Listings
          :items="ebayActive"
          :loading="loading"
          title="Active Listing Results"
          endDateText="Ends:"
          listingsType="active"
        />
      </v-col>
      <v-col cols="6">
        <Listings
          :items="ebayEnded"
          :loading="loading"
          title="Ended Listing Results"
          endDateText="Sold:"
          listingsType="ended"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import EbaySummary from "./EbaySummary";
import Listings from "./Results/Listings";

export default {
  components: {
    EbaySummary,
    Listings
  },
  data: () => ({
    ignoreCalcShipping: false
  }),
  computed: {
    ...mapState({
      loading: state => state.pricing.loading
    }),
    ...mapGetters({
      ebayActive: "pricing/getEbayActive",
      ebayEnded: "pricing/getEbayEnded"
    })
    /*
    getActiveFilteredResults() {
      if (this.ignoreCalcShipping) {
        const filtered = this.active_results.filter(
          item => item.shippingInfo.shippingType !== "Calculated"
        );
        return filtered;
      }
      return this.results;
    },
    getEndedFilteredResults() {
      if (this.ignoreCalcShipping) {
        const filtered = this.ended_results.filter(
          item => item.shippingInfo.shippingType !== "Calculated"
        );
        return filtered;
      }
      return this.results;
    },
    */
    /*
    calculateSalesPrices() {
      if (this.ended_results.length === 0) return [];
      const prices = this.ended_results.map(item => {
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
    */
  },
  methods: {
    /*
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
    */
  }
};
</script>

<style scoped></style>
