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
          :isLotItem="isLotItem(item.CategoryName)"
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

      <template v-slot:item.action="{ item }">
        <v-slide-x-reverse-transition mode="out-in">
          <div :key="`transition_bin_rack_number_${item.pkStockItemID}`">
            <v-btn
              color="success"
              class="pr-3"
              style="min-width:20px;"
              @click="selectItem(item.pkStockItemID)"
              ><v-icon class="">fa-edit</v-icon></v-btn
            >
          </div>
        </v-slide-x-reverse-transition>
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
import LinnworksMobile from "./Mobile/LinnworksMobile";

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
  },
  methods: {
    isLotItem(categoryName) {
      return categoryName.toUpperCase() == "EBAY-LOTS";
    },
    selectItem(pkStockItemID) {
      //handle opening our dialog box
      console.log("We need to dispatch the action that will handle this");
    }
  }
};
</script>

<style scoped></style>
