<template>
  <div class="w-100 h-100">
    <DatatableHeader
      :totalRows="filteredItems.length"
      @inStockFilterUpdate="handleInStockFilterUpdate"
    />

    <v-data-table
      class="w-100"
      :headers="headerList"
      :items="filteredItems"
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
        <LinnworksPrice
          :keyString="`retailprice_${item.pkStockItemID}`"
          :value="item.RetailPrice"
          fontClass="body-2"
        />
      </template>

      <template v-slot:item.ListingPrice="{ item }">
        <LinnworksPrice
          :keyString="`listingprice_${item.pkStockItemID}`"
          :value="item.ListingPrice"
          fontClass="body-2"
        />
      </template>

      <template v-slot:item.StartPrice="{ item }">
        <LinnworksPrice
          :keyString="`startprice_${item.pkStockItemID}`"
          :value="item.StartPrice"
          fontClass="body-2"
        />
      </template>

      <template v-slot:item.DeclinePrice="{ item }">
        <LinnworksPrice
          :keyString="`declineprice_${item.pkStockItemID}`"
          :value="item.DeclinePrice"
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
import DatatableHeader from "./DatatableHeader";

import LinnworksTitle from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksTitle";
import LinnworksCategoryName from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksCategoryName";
import LinnworksQuantity from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksQuantity";
import LinnworksBinRackNumber from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksBinRackNumber";
import LinnworksPrice from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksPrice";
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
    DatatableHeader,
    LinnworksCategoryName,
    LinnworksImage,
    LinnworksTitle,
    LinnworksQuantity,
    LinnworksBinRackNumber,
    LinnworksPrice,
    LinnworksMobile
  },
  data() {
    return {
      headers,
      mobileHeadersFilter: [
        "ListingPrice",
        "RetailPrice",
        "DeclinePrice",
        "StartPrice",
        "Quantity",
        "BinRackNumber"
      ],
      blnInStockOnly: false
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
    },
    filteredItems() {
      if (this.blnInStockOnly)
        return this.items.filter(item => item.Quantity > 0);

      return this.items;
    }
  },
  methods: {
    isLotItem(categoryName) {
      return categoryName.toUpperCase() == "EBAY-LOTS";
    },
    selectItem(pkStockItemID) {
      this.$emit("itemSelected", pkStockItemID);
    },
    handleInStockFilterUpdate(value) {
      this.blnInStockOnly = value;
    }
  }
};
</script>

<style scoped></style>
