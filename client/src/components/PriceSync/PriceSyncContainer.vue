<template>
  <div>
    <div class="text-right">
      <h4 class="subtitle">Record Count: {{ items.length }}</h4>
    </div>
    <V-divider />
    <v-data-table
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="10"
      :footer-props="footerProps"
    >
      <template v-slot:item.RetailPrice="{ item }">
        {{ item.RetailPrice | currency }}
      </template>
      <template v-slot:item.StockItemPrice="{ item }">
        {{ item.StockItemPrice | currency }}
      </template>
      <template v-slot:item.eBayListingPrice="{ item }">
        {{ item.eBayListingPrice | currency }}
      </template>
      <template v-slot:item.eBayStartTime="{ item }">
        {{ item.eBayStartTime | dateTime }}
      </template>
      <template v-slot:item.eBayEndTime="{ item }">
        {{ item.eBayEndTime | dateTime }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_OUT_OF_SYNC_PRICES } from "@/store/action-types";
import { tableHeaders } from "./tableHeaders.js";

export default {
  created() {
    this.fetchData();
  },
  data: () => ({
    headers: tableHeaders,
    footerProps: {
      "items-per-page-options": [5, 10, 25, 50]
    }
  }),
  computed: {
    ...mapGetters({
      items: "linnworks/priceSync/getItems",
      loading: "linnworks/priceSync/getLoading"
    })
  },
  methods: {
    fetchData() {
      this.$store.dispatch(`linnworks/priceSync/${GET_OUT_OF_SYNC_PRICES}`, {});
    }
  }
};
</script>

<style scoped></style>
