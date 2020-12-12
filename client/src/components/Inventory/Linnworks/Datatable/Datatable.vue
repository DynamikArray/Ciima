<template>
  <div class="w-100 h-100">
    <v-data-table
      class="w-100"
      :headers="headerList"
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

      <template v-slot:item.ItemTitle="{ item }">
        <LinnworksTitle
          v-if="!isMobile"
          :keyString="item.pkStockItemID"
          :value="item.ItemTitle"
          fontClass="body-1"
        />

        <LinnworksMobile
          v-if="isMobile"
          :item="item"
          :keyString="item.pkStockItemID"
        />
      </template>

      <template v-slot:item.Quantity="{ item }">
        <LinnworksQuantity
          :keyString="item.pkStockItemID"
          :value="item.Quantity"
          fontClass="caption"
        />
      </template>

      <template v-slot:item.BinRackNumber="{ item }">
        <LinnworksBinRackNumber
          :keyString="item.pkStockItemID"
          :value="item.BinRackNumber"
          fontClass="caption"
        />
      </template>

      <template v-slot:item.RetailPrice="{ item }">
        <LinnworksRetailPrice
          :keyString="item.pkStockItemID"
          :value="item.RetailPrice"
          fontClass="body-2"
        />
      </template>

      <template v-slot:item.ListingPrice="{ item }">
        <LinnworksListingPrice
          :keyString="item.pkStockItemID"
          :value="item.ListingPrice"
          fontClass="body-2"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./headers";

import LinnworksTitle from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksTitle";
import LinnworksCategoryName from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksCategoryName";
import LinnworksQuantity from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksQuantity";
import LinnworksBinRackNumber from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksBinRackNumber";
import LinnworksRetailPrice from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksRetailPrice";
import LinnworksListingPrice from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksListingPrice";
import LinnworksMobile from "./LinnworksMobile";

import LinnworksImage from "@/components/Shared/Datatable/FieldTemplates/LinnworksImage";

export default {
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    },
    isMobile: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    LinnworksCategoryName,
    LinnworksImage,
    LinnworksTitle,
    LinnworksQuantity,
    LinnworksBinRackNumber,
    LinnworksRetailPrice,
    LinnworksListingPrice,
    LinnworksMobile
  },
  data() {
    return {
      headers,
      mobileHeadersFilter: [
        "ListingPrice",
        "RetailPrice",
        "Quantity",
        "BinRackNumber"
      ]
    };
  },
  computed: {
    headerList() {
      if (this.isMobile) {
        return headers.filter(
          item => !this.mobileHeadersFilter.includes(item.value)
        );
      }

      return headers;
    }
  }
};
</script>

<style scoped></style>
