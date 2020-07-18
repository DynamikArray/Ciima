<template>
  <div class="w-100">
    <!--Start Page Heading -->
    <div class="d-flex flex-wrap justify-space-between align-center">
      <div class="d-flex flex-shrink">
        <h1 class="ma-0">
          <v-icon large class="mr-1">fa-chart-bar</v-icon>Anayltics & Reporting
        </h1>
      </div>
      <div class="d-flex flex-grow flex-wrap m-3">
        <v-tabs
          v-model="tab"
          right
          center-active
          active-class="white--text"
          background-color="-secondary -darken-1"
          color="primary"
          id="analyticsTabs"
        >
          <v-tab> <v-icon left>fa fa-chart-line</v-icon>Summary</v-tab>
          <v-tab> <v-icon left>fa fa-chart-bar</v-icon>Detailed</v-tab>
        </v-tabs>
      </div>
    </div>

    <v-divider class="mt-1 mb-2"></v-divider>

    <v-tabs-items
      v-model="tab"
      class="w-100 d-flex flex-column align-self-stretch"
      style="background-color:transparent"
    >
      <v-tab-item key="overview" class="mx-2 pb-3">
        <WeekToWeek />
      </v-tab-item>

      <v-tab-item key="breakdown" class="pt-2">
        <div class="d-flex flex-wrap justify-space-between align-start">
          <div class="d-flex align-end justify-center ">
            <DatasetTypeButton :isActive.sync="showNewItems" />
          </div>

          <div class="d-flex align-center">
            <AnalyticsFilters
              :userId="userId"
              :days="days"
              :getData="fetchAnalyticsWithParams"
              :updateParam="updateLocalParam"
            />
          </div>
        </div>
        <v-divider class="my-1"></v-divider>

        <div class="d-flex align-center justify-center">
          <AnalyticsGrandTotal
            class="mx-auto my-2"
            :title="analyticsDaysAsString"
            :newItems="newItems"
            :existingItems="existingItems"
          />
        </div>

        <div class="d-flex flex-grow justify-start align-center">
          <v-dialog
            v-model="analyticsLoading"
            hide-overlay
            persistent
            width="300"
          >
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
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ANALYTICS_FETCH } from "@/store/action-types";

import { analyticDays } from "@/components/Datatable/Filters/DaysDropdown/daysList";
import AnalyticsFilters from "./AnalyticsFilters";
import DatasetTypeButton from "./Buttons/DatasetTypeButton";
import AnalyticsContent from "./AnalyticsContent";
import AnalyticsGrandTotal from "./AnalyticsGrandTotal";
import WeekToWeek from "./WeekToWeek";

export default {
  components: {
    AnalyticsFilters,
    DatasetTypeButton,
    AnalyticsGrandTotal,
    AnalyticsContent,
    WeekToWeek
  },
  data: () => ({
    userId: "ALL",
    userName: "All Users",
    days: 0,
    buttonToggle: 0,
    showNewItems: true,
    tab: 0
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
    },
    analyticsDaysAsString() {
      return analyticDays.filter(day => day.value == this.days).shift().text;
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
<style>
#analyticsTabs .v-item-group.v-tabs-bar {
  background-color: transparent;
}
</style>
<style scoped></style>
