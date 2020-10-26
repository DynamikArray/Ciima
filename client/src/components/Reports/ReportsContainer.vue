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

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
      const _this = this;

      //Sort Ascending Title
      const soldItems = this.soldItems.sort((a, b) =>
        a.linnworksTitle > b.linnworksTitle ? 1 : -1
      );

      //main method handling
      var dd = {
        pageMargins: [10, 20, 10, 20],
        pageOrientation: "landscape",
        header: function(currentPage, pageCount, pageSize) {
          const opts = { currentPage, pageCount, pageSize };
          return _this.buildReportHeader(opts);
        },
        content: this.buildPDFContent(soldItems),
        footer: function(currentPage, pageCount, pageSize) {
          const opts = { currentPage, pageCount, pageSize };
          return _this.buildReportFooter(opts);
        }
      };

      pdfMake.createPdf(dd).open();
    },

    buildReportHeader: function({ currentPage }) {
      const { categoryName, startDate, endDate } = this.filters;
      const dateFilter = this.$options.filters.date;

      if (currentPage == 1) {
        return {
          text: `Sold Items Report: ${categoryName} from ${dateFilter(
            startDate
          )} through ${dateFilter(endDate)}`,
          fontSize: 16,
          alignment: "center"
        };
      }
    },

    buildReportFooter: function({ currentPage, pageCount }) {
      return {
        text: `Page ${currentPage} of ${pageCount}`,
        fontSize: 10,
        alignment: "center"
      };
    },

    buildPDFContent(soldItems) {
      soldItems.unshift({
        processedOnDate: "Date",
        pricePerUnit: "Price",
        linnworksTitle: "Title"
      });

      return {
        layout: "lightHorizontalLines",
        table: {
          headerRows: 1,
          widths: [70, 40, "*"],
          body: soldItems.map((item, i) => {
            return [
              {
                text: item.processedOnDate,
                alignment: "left",
                fontSize: 10
              },
              {
                text: item.pricePerUnit,
                alignment: "center",
                fontSize: 12
              },
              {
                text: item.linnworksTitle,
                alignment: "left",
                fontSize: 12
              }
            ];
          })
        }
      };
    }
  }
};
</script>

<style scoped></style>
