<template>
  <div class="w-100">
    <div class="w-100 d-flex flex-wrap justify-end align-center">
      <ReportFilters
        :startDate="filters.startDate"
        :endDate="filters.endDate"
        :loading="loading"
        :getData="getData"
        :categoryName="filters.categoryName"
        @printGrid="printCurrentTab"
      />
    </div>
    <v-divider class="my-1"></v-divider>
    <v-tabs-items
      id="reportsWrapper"
      :value="tab"
      class="w-100 d-flex flex-column align-self-stretch"
      style="background-color:transparent"
    >
      <v-tab-item key="lots" class="pt-2">
        <LotsReport :items="soldItems" :loading="loading" />
      </v-tab-item>

      <v-tab-item key="sets" class="pt-2">
        <SetsReport :items="soldItems" :loading="loading" />
      </v-tab-item>

      <v-tab-item key="singles" class="pt-2">
        <SinglesReport :items="soldItems" :loading="loading" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SEARCH_SOLD_ITEMS } from "@/store/action-types";
import LotsReport from "./Tabs/LotsReport/LotsReport";
import SetsReport from "./Tabs/SetsReport/SetsReport";
import SinglesReport from "./Tabs/SinglesReport/SinglesReport";
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
  watch: {
    tab: function(val) {
      switch (val) {
        case 0:
          this.getData({ categoryName: "EBAY-LOTS" });
          break;
        case 1:
          this.getData({ categoryName: "EBAY-SETS" });
          break;
        case 2:
          this.getData({ categoryName: "EBAY-SINGLES" });
          break;
      }
    }
  },
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
    },
    printCurrentTab() {
      // Get HTML to print from element
      const prtHtml = document.getElementById("reportsWrapper").innerHTML;
      const stylesHtml =
        '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">';
      // Get all stylesheets HTML
      /*
      let stylesHtml = "";
      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style')
      ]) {
        stylesHtml += node.outerHTML;
      }
      */

      // Open the print window
      const WinPrint = window.open("", "title", "attributes");

      WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>
          ${stylesHtml}
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
    }
  }
};
</script>

<style scoped></style>
