<template>
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
      <LinnworksImage :imageUrl="item.Image" />
    </template>

    <template v-slot:item.Quantity="{ item }">
      <div class="body-1">
        {{ item.Quantity }}
      </div>
    </template>
    <template v-slot:item.RetailPrice="{ item }">
      <EditablePrice
        :item="item"
        priceField="RetailPrice"
        :otherFields="['StockItemPrice']"
        idField="pkStockItemID"
        @itemUpdated="itemUpdated"
      />
    </template>
    <template v-slot:item.StockItemPrice="{ item }">
      <StockItemPrice
        :itemId="item.pkStockItemID"
        :price="item.StockItemPrice"
      />
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

    <template v-slot:item.eBayListingStatus="{ item }">
      <ListingStatus :status="item.eBayListingStatus" />
    </template>
  </v-data-table>
</template>

<script>
import { tableHeaders } from "./tableHeaders.js";
import LinnworksImage from "./fieldTemplates/LinnworksImage";
import EditablePrice from "./fieldTemplates/Price";
import StockItemPrice from "./fieldTemplates/StockItemPrice";
import ListingStatus from "./fieldTemplates/ListingStatus";

export default {
  props: {
    items: {
      type: [Array],
      default: []
    },
    loading: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    LinnworksImage,
    EditablePrice,
    StockItemPrice,
    ListingStatus
  },
  data: () => ({
    headers: tableHeaders,
    footerProps: {
      "items-per-page-options": [5, 10, 25, 50]
    }
  }),
  methods: {
    itemUpdated() {
      this.$emit("rowUpdated");
    }
  }
};
</script>

<style scoped></style>
