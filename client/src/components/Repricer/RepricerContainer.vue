<template>
  <div class="d-flex flex-column align-start justify-start w-100">
    <div class="">
      <!-- <InProgress key="inProgressMini" :mini="true" /> -->
    </div>
    <div class="d-flex align-start justify-start w-100">
      <v-tabs-items
        id="repricingTabsWrapper"
        :value="tab"
        class="w-100 d-flex flex-column align-self-stretch"
        style="background-color:transparent"
      >
        <v-tab-item key="NeedRepricing" class="pt-2">
          <NeedRepricing
            :items="needRepricingItems"
            :loading="needRepricingLoading"
            @submitItem="submitItem"
          />
        </v-tab-item>
        <v-tab-item key="BeenRepriced" class="pt-2">
          <BeenRepriced
            :items="beenRepricedItems"
            :loading="beenRepricedLoading"
          />
        </v-tab-item>

        <v-tab-item key="RepricingLog" class="pt-2">
          <RepricingLog
            :items="repricingLog"
            :pager="repricingLogPager"
            :loading="repricingLogLoading"
          />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import BeenRepriced from "./Tabs/BeenRepriced";
import NeedRepricing from "./Tabs/NeedRepricing";
import RepricingLog from "./Tabs/RepricingLog";

import {
  SUBMIT_NEED_REPRICING_ITEM,
  SEARCH_NEED_REPRICING_ITEMS,
  SEARCH_BEEN_REPRICED_ITEMS,
  SEARCH_REPRICING_LOG
} from "@/store/action-types";

import { mapGetters } from "vuex";

export default {
  name: "RepricerContainer",
  components: {
    RepricingLog,
    BeenRepriced,
    NeedRepricing
  },
  created() {
    this.getData();
    let _this = this;
    this.interval = setInterval(() => {
      _this.checkIfHasItemsUpdating();
    }, 30000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  props: {
    tab: {
      type: [Number]
    }
  },
  computed: {
    ...mapGetters({
      needRepricingItems: "repricer/needRepricing/getItems",
      needRepricingLoading: "repricer/needRepricing/getLoading",
      beenRepricedItems: "repricer/beenRepriced/getItems",
      beenRepricedLoading: "repricer/beenRepriced/getLoading",
      repricingLog: "repricer/repricingLog/getRepricingLog",
      repricingLogPager: "repricer/repricingLog/getRepricingLogPager",
      repricingLogLoading: "repricer/repricingLog/getRepricingLogLoading"
    })
  },
  watch: {
    beenRepricedItems(newVal) {
      //console.log("beenRepricedItems changed");
    }
  },
  data: () => ({
    interval: false
  }),
  methods: {
    getData() {
      this.getNeedRepricing();
      this.getBeenRepriced();
      this.getRepricingLog();
    },
    getNeedRepricing() {
      this.$store.dispatch(
        `repricer/needRepricing/${SEARCH_NEED_REPRICING_ITEMS}`,
        { repricedItems: false }
      );
    },
    getBeenRepriced() {
      this.$store.dispatch(
        `repricer/beenRepriced/${SEARCH_BEEN_REPRICED_ITEMS}`,
        { repricedItems: true }
      );
    },
    getRepricingLog() {
      this.$store.dispatch(`repricer/repricingLog/${SEARCH_REPRICING_LOG}`);
    },
    checkIfHasItemsUpdating() {
      if (
        this.beenRepricedItems.filter(
          item => item.eBayListingStatus == "UPDATING"
        ).length > 0
      )
        this.getBeenRepriced();

      /*
      if (
        this.needRepricingItems.filter(
          item => item.eBayListingStatus == "UPDATING"
        ).length > 0
      )
        this.getNeedRepricing();
      */
    },
    async submitItem({ pkStockItemID, ItemTitle }) {
      const res = await this.$store.dispatch(
        `repricer/needRepricing/${SUBMIT_NEED_REPRICING_ITEM}`,
        { pkStockItemID, ItemTitle }
      );
      if (res.result) {
        this.$toastr.Add({
          name: "Success",
          title: "Submitted!",
          msg: res.result,
          clickClose: true,
          timeout: 750
        });
        //Small timeout to allow records to update?
        setTimeout(() => {
          this.getBeenRepriced();
        }, 500);
      }
      if (res.error) this.$toastr.e(res.error);
    }
  }
};
</script>

<style scoped></style>
