<template>
  <div class="d-flex flex-column align-stretch pricingTabsWrapper">
    <v-tabs
      v-model="tab"
      centered
      center-active
      color="primary"
      active-class="grey darken-3 white--text"
      background-color="grey darken-4"
    >
      <v-tab> <v-icon left>fab fa-ebay</v-icon>Active </v-tab>
      <v-tab> <v-icon left>fab fa-ebay</v-icon>Ended </v-tab>
      <v-tab v-if="defaultProductType === `singles`">
        <v-icon left>fa fa-globe</v-icon>
        MyComicShop.com
      </v-tab>
    </v-tabs>
    <vuescroll :ops="ops" class="mr-1">
      <v-tabs-items
        v-model="tab"
        class="w-100 d-flex flex-column align-stretch pricingTabsItemWrapper"
      >
        <v-tab-item key="ebayActive" class="">
          <PricingResults
            :items="ebayActive"
            :loading="loading"
            endDateText="End Date:"
            listingsType="active"
            sortResultsByDate
            sortResultsByPrice
          />
        </v-tab-item>
        <v-tab-item key="ebayEnded" class="">
          <PricingResults
            :items="ebayEnded"
            :loading="loading"
            endDateText="Sold Date:"
            listingsType="ended"
            sortResultsByDate
            sortResultsByPrice
          />
        </v-tab-item>
        <v-tab-item
          key="mycomicshop"
          class="-h-100"
          v-if="defaultProductType === `singles`"
        >
          <PricingResults
            :items="myComicShop"
            :loading="loading"
            :endDateText="false"
            :listingsType="false"
            sortResultsByPrice
          />
        </v-tab-item>
      </v-tabs-items>
    </vuescroll>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";

import PricingResults from "@/components/Pricing/Results/PricingResults";

export default {
  components: {
    vuescroll,
    PricingResults
  },
  data: () => ({
    tab: 0,
    ops: scrollbarSettings
  }),
  computed: {
    ...mapState({
      defaultProductType: state => state.settings.defaultProductType,
      loading: state => state.pricing.loading
    }),
    ...mapGetters({
      ebayActive: "pricing/getEbayActive",
      ebayEnded: "pricing/getEbayEnded",
      myComicShop: "pricing/getMyComicShop"
    })
  }
};
</script>

<style scoped>
.pricingTabsWrapper {
  height: calc(100% - 75px);
}
.pricingTabsItemWrapper {
  overflow-y: hidden;
}
</style>
