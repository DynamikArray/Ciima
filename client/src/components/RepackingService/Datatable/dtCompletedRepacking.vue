<template>
  <div class="dtCompletedRepacking w-100">
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
        <div class="dtSlotTop d-flex flex-row align-center justify-space-between pa-1">
          <div class="d-flex justify-start align-center mx-1">
            &nbsp;
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
        <ItemInfoPanel :item="item" actionBtnIconText="Active Listing" actionBtnColor="red darken-2" />
      </template>

      <template v-slot:item.PerComicPrice="{ item }">
        <LinnworksPrice :keyString="item.pkStockItemID" :value="item.PerComicPrice" fontClass="title" />
      </template>

      <template v-slot:item.repackCompletedDate="{ item }">
        <CiimaDateTimeField :itemId="item.pkStockItemID" :value="item.repackCompletedDate" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { completedItemsHeaders } from "./_headers";

import LinnworksImage from "@/components/Shared/Datatable/FieldTemplates/LinnworksImage";
import LinnworksPrice from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksPrice";
import CiimaDateTimeField from "@/components/Shared/Datatable/FieldTemplates/CiimaDateTimeField";
import ItemInfoPanel from "./FieldTemplates/ItemInfoPanel";

export default {
  name: "dtCompletedRepacking",
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    }
  },
  components: {
    ItemInfoPanel,
    LinnworksImage,
    LinnworksPrice,
    CiimaDateTimeField
  },
  data() {
    return {
      headers: completedItemsHeaders
      /* filterBy: false */
    };
  },
  computed: {},
  methods: {}
};
</script>

<style>
.dtCompletedRepacking .dtSlotTop .v-data-footer {
  border-top: 0px !important;
}
</style>
