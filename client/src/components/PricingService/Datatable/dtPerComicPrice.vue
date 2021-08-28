<template>
  <div class="dtPerComicPrice w-100">
    <v-data-table
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
      sort-by="BelowThreshold"
      sort-desc
      ref="dataTable"
      @update:page="$vuetify.goTo($refs.dataTable)"
    >
      <template v-slot:top="{ pagination, options, updateOptions }">
        <div class="d-flex flex-row align-center justify-space-between pa-1">
          <div class="d-flex justify-start align-center mx-1 flex-grow-1">
            <PerComicPriceSearchForm class="body-1" />
          </div>
          <div class="d-flex justify-end align-center mx-1">
            <v-data-footer
              :pagination="pagination"
              :options="options"
              @update:options="updateOptions"
              items-per-page-text="$vuetify.dataTable.itemsPerPageText"
            />
          </div>
        </div>
        <div class="w-100">
          <v-divider class="my-1" />
        </div>
      </template>

      <template v-slot:item.Image="{ item }">
        <LinnworksImage :imageUrl="item.Image" />
      </template>

      <template v-slot:item.ItemTitle="{ item }">
        <PerComicPriceInfoPanel :item="item" :class="item.InOrderBook ? 'grey px-2' : ''" />
      </template>

      <template v-slot:item.PerComicPrice="{ item }">
        <LinnworksPrice :keyString="item.pkStockItemID" :value="item.PerComicPrice" fontClass="title" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import perComicPriceHeaders from "./_headers";

import PerComicPriceSearchForm from "@/components/PricingService/Tabs/PerComicPrice/dtSearchForm";
import LinnworksImage from "@/components/Shared/Datatable/FieldTemplates/LinnworksImage";
import LinnworksPrice from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksPrice";
import PerComicPriceInfoPanel from "./FieldTemplates/PerComicPriceInfoPanel";

export default {
  name: "dtPerComicPrice",
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    }
  },
  components: {
    PerComicPriceSearchForm,
    PerComicPriceInfoPanel,
    LinnworksImage,
    LinnworksPrice
  },
  data() {
    return {
      headers: perComicPriceHeaders
      /* filterBy: false */
    };
  },
  computed: {
    /* filter example
    filteredItems() {
      if (this.filterBy) {
        return this.items.filter(item => item.eBayListingStatus.toLocaleLowerCase() == this.filterBy.toLowerCase());
      }
      return this.items;
    }
    */
  },
  methods: {
    /* filter explame
    handleFilterUpdate(val) {
      this.filterBy = val;
    }
    */
  }
};
</script>

<style>
.dtPerComicPrice .v-data-footer {
  border-top: 0px !important;
}
</style>
