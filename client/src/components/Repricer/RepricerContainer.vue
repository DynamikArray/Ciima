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
          />
        </v-tab-item>
        <v-tab-item key="BeenRepriced" class="pt-2">
          <BeenRepriced
            :items="beenRepricedItems"
            :loading="beenRepricedLoading"
          />
        </v-tab-item>

        <v-tab-item key="InProgress" class="pt-2">
          <InProgress />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
/*import InProgress from "./Datatable/InProgress/InProgressContainer";*/
import BeenRepriced from "./Tabs/BeenRepriced";
import NeedRepricing from "./Tabs/NeedRepricing";
import InProgress from "./Tabs/InProgress";

import {
  SEARCH_NEED_REPRICING_ITEMS,
  SEARCH_BEEN_REPRICED_ITEMS
} from "@/store/action-types";

import { mapGetters } from "vuex";

export default {
  name: "RepricerContainer",
  components: {
    InProgress,
    BeenRepriced,
    NeedRepricing
  },
  created() {
    this.getData();
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
      beenRepricedLoading: "repricer/beenRepriced/getLoading"
    })
  },
  methods: {
    getData() {
      this.$store.dispatch(
        `repricer/needRepricing/${SEARCH_NEED_REPRICING_ITEMS}`,
        { repricedItems: false }
      );

      this.$store.dispatch(
        `repricer/beenRepriced/${SEARCH_BEEN_REPRICED_ITEMS}`,
        { repricedItems: true }
      );
    }
  }
};
</script>

<style scoped></style>
