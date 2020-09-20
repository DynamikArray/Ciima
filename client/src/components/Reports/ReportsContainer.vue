<template>
  <div class="w-100">
    <div class="w-100 d-flex flex-wrap justify-center align-center">
      <ReportFilters
        :startDate="filters.startDate"
        :endDate="filters.endDate"
        :categoryName="filters.categoryName"
        :loading="loading"
        :getData="getData"
      />
    </div>
    <v-divider class="my-1"></v-divider>
    <v-tabs-items
      :value="tab"
      class="w-100 d-flex flex-column align-self-stretch"
      style="background-color:transparent"
    >
      <v-tab-item key="lots" class="pt-2">
        <LotReport />
      </v-tab-item>

      <v-tab-item key="sets" class="mx-2 pb-3 w-100 fill-height">
        <h1 class="display-2 text-center">
          <v-icon x-large class="">fa-exclamation-circle</v-icon>
          Set Reports are not yet completed!
        </h1>
      </v-tab-item>

      <v-tab-item key="singles" class="mx-2 pb-3 w-100 fill-height">
        <h1 class="display-2 text-center">
          <v-icon x-large class="">fa-exclamation-circle</v-icon>
          Singles Reports are not yet completed!
        </h1>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import LotReport from "./Tabs/LotReport";
import ReportFilters from "./ReportFilters";

const { format, subDays } = require("date-fns");

export default {
  props: {
    tab: [Boolean, Number]
  },
  components: {
    LotReport,
    ReportFilters
  },
  created() {
    //Set our defaults
    this.filters.categoryName = "EBAY-LOTS";
    this.filters.startDate = format(subDays(Date.now(), 5), "YYYY-MM-DD");
    this.filters.endDate = format(Date.now(), "YYYY-MM-DD");
  },
  data: () => ({
    loading: false, //will come from mapState
    filters: {
      startDate: "",
      endDate: "",
      categoryName: ""
    }
  }),
  methods: {
    updateLocalParam(params) {
      Object.keys(params).forEach(key => {
        this.filters[key] = params[key];
      });
    },
    getData(params = {}) {
      this.updateLocalParam(params);

      console.log("Call some action we ahve to make still with these params", {
        ...this.filters,
        ...params
      });
      /*
      this.updateLocalParam(params);
      this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_FETCH}`, {
        ...this.filters,
        ...params
      });
      */
    }
  }
};
</script>

<style scoped></style>
