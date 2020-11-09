<template>
  <div class="w-100">
    <v-data-table
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
    >
      <template v-slot:item.Image="{ item }">
        <LinnworksImage :imageUrl="item.Image" />
      </template>

      <template v-slot:item.ItemTitle="{ item }">
        <LinnworksItemTitle :item="item" />
      </template>

      <template v-slot:item.Quantity="{ item }">
        <LinnworksQuantity :item="item" />
      </template>

      <template v-slot:item.StockItemPrice="{ item }">
        <LinnworksStockItemPrice :item="item" />
      </template>

      <template v-slot:item.eBayListingPrice="{ item }">
        <LinnworksEbayListingPrice :item="item" />
      </template>

      <template v-slot:item.LastPrice="{ item }">
        <LinnworksLastPrice :item="item" />
      </template>

      <template v-slot:item.LastPriced="{ item }">
        <LinnworksLastPriced :item="item" />
      </template>

      <template v-slot:item.eBayStartTime="{ item }">
        <LinnworksEbayStartTime :item="item" />
      </template>
      <template v-slot:item.eBayEndTime="{ item }">
        <LinnworksEbayEndTime :item="item" />
      </template>
      <template v-slot:item.ItemCreationDate="{ item }">
        <LinnworksItemCreationDate :item="item" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./_headers";
import LinnworksImage from "@/components/Shared/Datatable/FieldTemplates/LinnworksImage";
import LinnworksItemTitle from "@/components/Shared/Datatable/FieldTemplates/LinnworksItemTitle";
import LinnworksQuantity from "@/components/Shared/Datatable/FieldTemplates/LinnworksQuantity";
import LinnworksStockItemPrice from "@/components/Shared/Datatable/FieldTemplates/LinnworksStockItemPrice";
import LinnworksEbayListingPrice from "@/components/Shared/Datatable/FieldTemplates/LinnworksEbayListingPrice";

import LinnworksLastPrice from "@/components/Shared/Datatable/FieldTemplates/LinnworksLastPrice";
import LinnworksLastPriced from "@/components/Shared/Datatable/FieldTemplates/LinnworksLastPriced";

import LinnworksEbayStartTime from "@/components/Shared/Datatable/FieldTemplates/LinnworksEbayStartTime";
import LinnworksEbayEndTime from "@/components/Shared/Datatable/FieldTemplates/LinnworksEbayEndTime";
import LinnworksItemCreationDate from "@/components/Shared/Datatable/FieldTemplates/LinnworksItemCreationDate";

export default {
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    }
  },
  components: {
    LinnworksImage,
    LinnworksItemTitle,
    LinnworksQuantity,
    LinnworksStockItemPrice,
    LinnworksEbayListingPrice,
    LinnworksLastPrice,
    LinnworksLastPriced,
    LinnworksEbayStartTime,
    LinnworksEbayEndTime,
    LinnworksItemCreationDate
  },
  data: () => ({
    headers
  })
};
</script>

<style scoped></style>
