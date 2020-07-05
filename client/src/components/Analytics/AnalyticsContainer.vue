<template>
  <div class="w-100">
    <!--Start Page Heading -->
    <div class="d-flex flex-wrap justify-space-between align-center">
      <div class="d-flex flex-shrink">
        <h1 class="ma-0">
          <v-icon large class="mr-1">fa-chart-bar</v-icon>Anayltics
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

    <!--Page Content-->
    <div class="d-flex flex-grow justify-start align-center">
      <AnalyticsContent
        v-if="!analyticsLoading"
        :userId="userId"
        :userName="userName"
        :days="days"
        :getData="fetchAnalyticsWithParams"
        :updateParam="updateLocalParam"
        :analyticsLoading="analyticsLoading"
        :analyticsData="analyticsData"
      />
    </div>
    <!--Page Content-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ANALYTICS_FETCH } from "@/store/action-types";

import AnalyticsFilters from "./AnalyticsFilters";
import AnalyticsContent from "./AnalyticsContent";

export default {
  components: {
    AnalyticsFilters,
    AnalyticsContent
  },
  data: () => ({
    userId: "ALL",
    userName: "All Users",
    days: 7
  }),
  async created() {
    await this.fetchAnalyticsWithParams();
  },
  computed: {
    ...mapState({
      analyticsLoading: state => state.analytics.loading,
      analyticsData: state => state.analytics.items
    })
  },
  methods: {
    updateLocalParam(params) {
      Object.keys(params).forEach(key => {
        if (this[key]) this[key] = params[key];
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
    }
  }
};
</script>

<style scoped></style>
