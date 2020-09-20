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
        <LotsReport :items="soldItems" :loading="loading" />
      </v-tab-item>

      <!--
      <v-tab-item key="sets" class="mx-2 pb-3 w-100 fill-height">
        <SetsReport :items="soldItems" :loading="loading" />
      </v-tab-item>

      <v-tab-item key="singles" class="mx-2 pb-3 w-100 fill-height">
        <SinglesReport :items="soldItems" :loading="loading" />
      </v-tab-item>
    -->
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SEARCH_SOLD_ITEMS } from "@/store/action-types";
import LotsReport from "./Tabs/LotReport/LotsReport";
import SetsReport from "./Tabs/SetsReport";
import SinglesReport from "./Tabs/SinglesReport";
import ReportFilters from "./ReportFilters";

const { format, subDays } = require("date-fns");

export default {
  props: {
    tab: [Boolean, Number]
  },
  components: {
    LotsReport,
    SetsReport,
    SinglesReport,
    ReportFilters
  },
  created() {
    //Set our defaults
    this.filters.categoryName = "EBAY-LOTS";
    this.filters.startDate = format(subDays(Date.now(), 5), "YYYY-MM-DD");
    this.filters.endDate = format(Date.now(), "YYYY-MM-DD");
    this.getData();
  },
  data: () => ({
    filters: {
      startDate: "",
      endDate: "",
      categoryName: ""
    }
  }),
  computed: {
    ...mapState({
      loading: state => state.reports.loading,
      soldItems: state => state.reports.items
    })
  },
  methods: {
    updateLocalParam(params) {
      Object.keys(params).forEach(key => {
        this.filters[key] = params[key];
      });
    },
    getData(params = {}) {
      this.updateLocalParam(params);
      this.$store.dispatch(`reports/${SEARCH_SOLD_ITEMS}`, {
        ...this.filters,
        ...params
      });
    }
  }
};
</script>

<style scoped></style>
