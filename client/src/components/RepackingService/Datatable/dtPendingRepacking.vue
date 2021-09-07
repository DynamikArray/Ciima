<template>
  <div class="dtPendingRepacking w-100">
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
        <ItemInfoPanel
          :item="item"
          actionBtnIconText="Active Listing"
          actionBtnColor="red darken-2"
          :class="canBeFinalized(item) ? '' : 'red accent-2 textShadow px-2'"
        />
      </template>

      <template v-slot:item.PerComicPrice="{ item }">
        <LinnworksPrice :keyString="item.pkStockItemID" :value="item.PerComicPrice" fontClass="title" />
      </template>

      <template v-slot:item.action="{ item }">
        <BtnSubmitToFinalize
          class="mr-3"
          :disabled="!canBeFinalized(item)"
          :keyString="item.pkStockItemID"
          :item="item"
          @submitItem="submitItem"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { pendingItemsHeaders } from "./_headers";

import {
  REPACKING_SERVICE_PENDING_FINALIZE_ITEM,
  REPACKING_SERVICE_PENDING_REMOVE_ITEM,
  REPACKING_SERVICE_COMPLETED_ITEMS
} from "@/store/action-types";

import LinnworksImage from "@/components/Shared/Datatable/FieldTemplates/LinnworksImage";
import LinnworksPrice from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksPrice";
import ItemInfoPanel from "./FieldTemplates/ItemInfoPanel";
import BtnSubmitToFinalize from "./FieldTemplates/BtnSubmitToFinalize";

export default {
  name: "dtPendingRepacking",
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
    BtnSubmitToFinalize
  },
  data() {
    return {
      headers: pendingItemsHeaders
      /* filterBy: false */
    };
  },
  computed: {},
  methods: {
    canBeFinalized(item) {
      if (item.Quantity > 0 || item.InOrderBook || item.ebayActive) return false;
      return true;
    },
    async submitItem({ pkStockItemID, sku }) {
      const res = await this.$store.dispatch(`repackingService/pending/${REPACKING_SERVICE_PENDING_FINALIZE_ITEM}`, {
        pkStockItemId: pkStockItemID,
        sku
      });
      if (res.result && !res.error) {
        this.$toastr.s("SUCCESS:" + res.result);
        //Remove item from searchResults
        this.$store.dispatch(`repackingService/pending/${REPACKING_SERVICE_PENDING_REMOVE_ITEM}`, {
          pkStockItemId: pkStockItemID
        });

        this.$store.dispatch(`repackingService/completed/${REPACKING_SERVICE_COMPLETED_ITEMS}`, {});
      }
      if (!res.result && res.error) {
        this.$toastr.e("ERROR: " + res.error);
      }
    }
  }
};
</script>

<style>
.dtPendingRepacking .dtSlotTop .v-data-footer {
  border-top: 0px !important;
}
</style>
