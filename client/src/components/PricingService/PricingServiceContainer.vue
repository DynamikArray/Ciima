<template>
  <div class="d-flex flex-column align-start justify-start w-100">
    <div class="">
      <!-- <InProgress key="inProgressMini" :mini="true" /> -->
    </div>
    <div class="d-flex align-start justify-start w-100">
      <v-tabs-items
        id="pricingServiceTabsWrapper"
        :value="tab"
        class="w-100 d-flex flex-column align-self-stretch"
        style="background-color:transparent"
      >
        <v-tab-item key="perComicPrice" class="pt-2">
          <PerComicPrice :items="perComicPriceItems" :loading="perComicPriceLoading" @printGrid="printCurrentTab" />
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
import { PRICING_SERVICE_SEARCH_ITEMS } from "@/store/action-types";

import PerComicPrice from "@/components/PricingService/Tabs/PerComicPrice/PerComicPrice";
export default {
  name: "PricingServiceContainer",
  props: {
    tab: {
      type: [Number]
    }
  },
  components: {
    PerComicPrice
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapGetters({
      perComicPriceItems: "pricingService/perComicPrice",
      perComicPriceLoading: "pricingService/perComicPriceLoading"
    })
  },
  methods: {
    fetchData() {
      this.$store.dispatch(`pricingService/${PRICING_SERVICE_SEARCH_ITEMS}`, {});
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
