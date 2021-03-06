<template>
  <v-row>
    <v-col>
      <div class="w-100 d-flex flex-wrap justify-end align-center">
        <CategorySalesFilters
          :startDate="filters.startDate"
          :endDate="filters.endDate"
          :loading="loading"
          :getData="getData"
          :categoryName="filters.categoryName"
        />
      </div>
      <v-divider class="my-1"></v-divider>
      <v-tabs-items
        id="CategorySalesReportsWrapper"
        :value="tab"
        class="w-100 d-flex flex-column align-self-stretch"
        style="background-color:transparent"
      >
        <v-tab-item key="daily" class="pt-2">
          <DailySalesTab :items="soldItems" :loading="loading" :categoryName="this.filters.categoryName" />
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import { SEARCH_CATEGORY_SALES } from "@/store/action-types";

const { format, subDays } = require("date-fns");

import DailySalesTab from "./Tabs/DailySales/DailySalesTab";
import CategorySalesFilters from "./Filters/CategorySalesFilters";

export default {
  props: {
    tab: [Boolean, Number]
  },
  components: {
    CategorySalesFilters,
    DailySalesTab
  },
  created() {
    //Set our defaults
    this.filters.categoryName = "EBAY-LOTS";
    this.filters.startDate = format(subDays(Date.now(), 30), "YYYY-MM-DD");
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
      loading: state => state.reports.categorySales.loading,
      soldItems: state => state.reports.categorySales.items
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
      this.$store.dispatch(`reports/categorySales/${SEARCH_CATEGORY_SALES}`, {
        ...this.filters,
        ...params
      });
    }
  }
};
</script>

<style scoped></style>
