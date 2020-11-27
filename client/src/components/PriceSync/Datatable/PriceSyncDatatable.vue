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
      <v-slide-x-reverse-transition mode="out-in">
        <div class="body-1" :key="`transition_${item.pkStockItemID}`">
          {{ item.ItemTitle }}
        </div>
      </v-slide-x-reverse-transition>
    </template>

    <template v-slot:item.Image="{ item }">
      <LinnworksImage :imageUrl="item.Image" />
    </template>

    <template v-slot:item.Quantity="{ item }">
      <v-slide-x-reverse-transition mode="out-in">
        <div class="body-1" :key="`transition_${item.pkStockItemID}`">
          {{ item.Quantity }}
        </div>
      </v-slide-x-reverse-transition>
    </template>

    <template v-slot:item.RetailPrice="{ item }">
      <v-slide-x-reverse-transition mode="out-in">
        <div class="body-1" :key="`transition_${item.pkStockItemID}`">
          <EditablePrice
            :item="item"
            priceField="RetailPrice"
            :otherFields="['StockItemPrice']"
            idField="pkStockItemID"
            @itemUpdated="itemUpdated"
          />
        </div>
      </v-slide-x-reverse-transition>
    </template>
    <template v-slot:item.StockItemPrice="{ item }">
      <StockItemPrice
        :itemId="item.pkStockItemID"
        :price="item.StockItemPrice"
      />
    </template>
    <template v-slot:item.eBayListingPrice="{ item }">
      <v-slide-x-reverse-transition mode="out-in">
        <div class="body-1" :key="`transition_${item.pkStockItemID}`">
          {{ item.eBayListingPrice | currency }}
        </div>
      </v-slide-x-reverse-transition>
    </template>
    <template v-slot:item.eBayStartTime="{ item }">
      <v-slide-x-reverse-transition mode="out-in">
        <div class="caption" :key="`transition_${item.pkStockItemID}`">
          {{ item.eBayStartTime | dateTime }}
        </div>
      </v-slide-x-reverse-transition>
    </template>

    <template v-slot:item.eBayEndTime="{ item }">
      <v-slide-x-reverse-transition mode="out-in">
        <div class="caption" :key="`transition_${item.pkStockItemID}`">
          {{ item.eBayEndTime | dateTime }}
        </div>
      </v-slide-x-reverse-transition>
    </template>

    <template v-slot:item.eBayListingStatus="{ item }">
      <v-slide-x-reverse-transition mode="out-in">
        <div class="" :key="`transition_${item.pkStockItemID}`">
          <ListingStatus :status="item.eBayListingStatus" />
        </div>
      </v-slide-x-reverse-transition>
    </template>
  </v-data-table>
</template>

<script>
import { tableHeaders } from "./tableHeaders.js";
import LinnworksImage from "@/components/Shared/Datatable/FieldTemplates/LinnworksImage";
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
