<template>
  <div class="w-100 h-100">
    <v-data-table
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
    >
      <template v-slot:item.CategoryName="{ item }">
        <LinnworksCategoryName
          :keyString="item.pkStockItemID"
          :value="item.CategoryName"
          fontClass="caption"
        />
      </template>
      <template v-slot:item.Image="{ item }">
        <LinnworksImage :imageUrl="item.Image" />
      </template>
      <template v-slot:item.eBayStartTime="{ item }">
        <LinnworksEbayStartTime :item="item" />
      </template>
      <template v-slot:item.eBayEndTime="{ item }">
        <LinnworksEbayEndTime :item="item" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./headers";
import LinnworksCategoryName from "@/components/Shared/Datatable/FieldTemplates/V2/LinnworksCategoryName";
import LinnworksImage from "@/components/Shared/Datatable/FieldTemplates/LinnworksImage";
import LinnworksEbayStartTime from "@/components/Shared/Datatable/FieldTemplates/LinnworksEbayStartTime";
import LinnworksEbayEndTime from "@/components/Shared/Datatable/FieldTemplates/LinnworksEbayEndTime";

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
    LinnworksCategoryName,
    LinnworksImage,
    LinnworksEbayStartTime,
    LinnworksEbayEndTime
  },
  data() {
    return {
      headers
    };
  }
};
</script>

<style scoped></style>
