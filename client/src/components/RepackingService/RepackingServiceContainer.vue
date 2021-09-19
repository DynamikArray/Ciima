<template>
  <div class="d-flex flex-column align-start justify-start w-100">
    <div class="">
      <!-- <InProgress key="inProgressMini" :mini="true" /> -->
    </div>
    <div class="d-flex align-start justify-start w-100">
      <v-tabs-items
        id="repackingServiceTabsWrapper"
        :value="tab"
        class="w-100 d-flex flex-column align-self-stretch"
        style="background-color:transparent"
      >
        <v-tab-item key="searchRepacking" class="pt-2">
          <SearchRepacking :items="perComicPriceItems" :loading="perComicPriceLoading" @printGrid="printCurrentTab" />
        </v-tab-item>

        <v-tab-item key="pendingRepacking" class="pt-2">
          <PendingRepacking :items="pendingItems" :loading="pendingItemsLoading" />
        </v-tab-item>

        <v-tab-item key="completedRepacking" class="pt-2">
          <CompletedRepacking :items="completedItems" :loading="completedItemsLoading" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { mapGetters } from "vuex";
import {
  REPACKING_SERVICE_SEARCH_ITEMS,
  REPACKING_SERVICE_PENDING_ITEMS,
  REPACKING_SERVICE_COMPLETED_ITEMS
} from "@/store/action-types";

import SearchRepacking from "@/components/RepackingService/Tabs/SearchRepacking/SearchRepacking";
import PendingRepacking from "@/components/RepackingService/Tabs/PendingRepacking/PendingRepacking";
import CompletedRepacking from "@/components/RepackingService/Tabs/CompletedRepacking/CompletedRepacking";

export default {
  name: "RepackingServiceContainer",
  props: {
    tab: {
      type: [Number]
    }
  },
  components: {
    SearchRepacking,
    PendingRepacking,
    CompletedRepacking
  },
  mounted() {
    this.initData();
  },
  computed: {
    ...mapGetters({
      perComicPriceItems: "repackingService/search/perComicPrice",
      perComicPriceLoading: "repackingService/search/perComicPriceLoading",
      pendingItems: "repackingService/pending/pendingItems",
      pendingItemsLoading: "repackingService/pending/pendingItemsLoading",
      completedItems: "repackingService/completed/completedItems",
      completedItemsLoading: "repackingService/completed/completedItemsLoading"
    })
  },
  methods: {
    initData() {
      this.$store.dispatch(`repackingService/search/${REPACKING_SERVICE_SEARCH_ITEMS}`, {});
      this.$store.dispatch(`repackingService/pending/${REPACKING_SERVICE_PENDING_ITEMS}`, {});
      this.$store.dispatch(`repackingService/completed/${REPACKING_SERVICE_COMPLETED_ITEMS}`, {});
    },
    printCurrentTab() {
      const _this = this;
      const soldItems = this.perComicPriceItems;

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
      if (currentPage == 1) {
        return {
          text: `Per Comic Price Report`,
          fontSize: 20,
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
      const formatNumber = value => {
        if (typeof value == "string") return value;
        if (typeof value == "number") return formatter.format(value);
      };

      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      });

      soldItems.unshift({
        CurrentListingPrice: "Listing Price",
        TotalIssues: "# of Issues",
        PerComicPrice: "Comic Price",
        ItemTitle: "Inventory Title",
        LocationCode: "Location Code"
      });

      return {
        layout: "lightHorizontalLines",
        table: {
          headerRows: 1,
          widths: [40, 40, 60, "*", 250],
          body: soldItems.map((item, i) => {
            return [
              {
                text: formatNumber(item.CurrentListingPrice),
                alignment: "center",
                fontSize: 10
              },
              {
                text: item.TotalIssues,
                alignment: "center",
                fontSize: 10
              },
              {
                text: formatNumber(item.PerComicPrice),
                alignment: "center",
                fontSize: 12
              },
              {
                text: item.ItemTitle,
                alignment: "left",
                fontSize: 12
              },
              {
                text: item.LocationCode,
                alignment: "right",
                fontSize: 10
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
