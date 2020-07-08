<template>
  <div class="w-100">
    <!--Start Page Heading -->
    <div class="d-flex flex-wrap justify-space-between align-center">
      <div class="d-flex flex-shrink">
        <h1 class="ma-0">
          <v-icon large class="mr-1">fa-chart-bar</v-icon>Anayltics & Reporting
        </h1>
      </div>
      <div class="d-flex flex-grow flex-wrap mx-3">
        <AnalyticsFilters
          :userId="userId"
          :days="days"
          :getData="fetchAnalyticsWithParams"
          :updateParam="updateLocalParam"
        />
      </div>
    </div>
    <v-divider class="my-1"></v-divider>
    <!--End Page Heading -->

    <div class="d-flex justify-space-between align-center">
      <AnalyticsGrandTotal
        :newItems="newItems"
        :existingItems="existingItems"
      />

      <div class="d-flex flex-shrink-0">
        <DatasetTypeButton :isActive.sync="showNewItems" />
      </div>
    </div>

    <v-divider class="my-1"></v-divider>
    <!--Page Content-->

    <div class="d-flex flex-grow justify-start align-center">
      <v-dialog v-model="analyticsLoading" hide-overlay persistent width="300">
        <v-card color="primary" dark class="pt-2">
          <v-card-text>
            <h4 class="text-center mb-2">
              <v-icon class="mr-2">fas fa-calculator</v-icon>
              Crunching the Number ...
            </h4>
            <v-progress-linear
              indeterminate
              color="white"
              class="mt-1"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <AnalyticsContent
        v-show="!analyticsLoading"
        :userId="userId"
        :userName="userName"
        :days="days"
        :getData="fetchAnalyticsWithParams"
        :updateParam="updateLocalParam"
        :analyticsLoading="analyticsLoading"
        :analyticsData="showNewItems ? newItems : existingItems"
        :title="showNewItems ? 'New Items Added' : 'Existing Items Updated'"
      />
    </div>

    <!--Page Content-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ANALYTICS_FETCH } from "@/store/action-types";

import AnalyticsFilters from "./AnalyticsFilters";
import DatasetTypeButton from "./Buttons/DatasetTypeButton";
import AnalyticsContent from "./AnalyticsContent";
import AnalyticsGrandTotal from "./AnalyticsGrandTotal";

export default {
  components: {
    AnalyticsFilters,
    DatasetTypeButton,
    AnalyticsGrandTotal,
    AnalyticsContent
  },
  data: () => ({
    userId: "ALL",
    userName: "All Users",
    days: 0,
    buttonToggle: 0,
    showNewItems: true
  }),
  async created() {
    await this.fetchAnalyticsWithParams();
  },
  computed: {
    ...mapState({
      analyticsLoading: state => state.analytics.loading
    }),
    newItems() {
      return this.$store.getters["analytics/newItems"];
    },
    existingItems() {
      return this.$store.getters["analytics/existingItems"];
    }
  },
  methods: {
    updateLocalParam(params) {
      Object.keys(params).forEach(key => {
        this[key] = params[key];
      });
    },
    async fetchAnalyticsWithParams(params = {}) {
      const _params = {
        //include all of our locals, overwrite passed in
        days: this.days,
        userId: this.userId,
        ...params
      };
      this.$store.dispatch(`analytics/${ANALYTICS_FETCH}`, _params);
    },
    OnClickHandlerDatasetButton(val) {
      this.showNewItems = val;
    }
  }
};
</script>

<style scoped></style>
