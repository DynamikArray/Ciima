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
      <template v-slot:item.ItemTitle="{ item }">
        <div class="body-1">
          {{ item.ItemTitle }}
        </div>
      </template>

      <template v-slot:item.Image="{ item }">
        <div class="pa-1 grey darken-4 text-center">
          <v-img
            contain
            :src="createThumbnailUrl(item.Image)"
            height="120"
            width="120"
            class="my-1 mx-1"
          />
        </div>
      </template>
      <template v-slot:item.Quantity="{ item }">
        <div class="body-1">
          {{ item.Quantity }}
        </div>
      </template>
      <template v-slot:item.RetailPrice="{ item }">
        <div class="body-1">
          {{ item.RetailPrice | currency }}
        </div>
      </template>
      <template v-slot:item.StockItemPrice="{ item }">
        <div class="body-1">
          {{ item.StockItemPrice | currency }}
        </div>
      </template>
      <template v-slot:item.eBayListingPrice="{ item }">
        <div class="body-1">
          {{ item.eBayListingPrice | currency }}
        </div>
      </template>
      <template v-slot:item.eBayStartTime="{ item }">
        <div class="caption">
          {{ item.eBayStartTime | dateTime }}
        </div>
      </template>

      <template v-slot:item.eBayEndTime="{ item }">
        <div class="caption">
          {{ item.eBayEndTime | dateTime }}
        </div>
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
    },
    createThumbnailUrl(image) {
      console.log(image);
      return image;
    }
  }
};
</script>

<style scoped></style>
