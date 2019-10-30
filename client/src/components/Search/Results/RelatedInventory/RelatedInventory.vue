<template>
  <div>
    <h4 class="text-center pa-1">Related Inventory Items</h4>
    <v-data-table
      id="relatedInventory"
      v-if="items"
      dense
      :loading="loading"
      :headers="headers"
      :items-per-page="5"
      :items="items"
      class="elevation-2"
      hide-default-header
    >
      <template v-slot:item.Images="{ item }">
        <ImagesHoverOver
          class="mt-1"
          :maxHeight="30"
          :imageFull="getMainImage(item.Images, `FullSource`)"
          :imageThumb="getMainImage(item.Images, `Source`)"
        />
      </template>

      <template v-slot:item.StockLevels="{ item }">
        <div v-html="createStockLevels(item.StockLevels)" />
      </template>

      <template v-slot:item.StockItemId="{ item }">
        <div v-html="createStockLocations(item.StockLevels)" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ImagesHoverOver from "@/components/Images/ImageHoverOver";
import { headers } from "./tableHeaders.js";

export default {
  components: {
    ImagesHoverOver
  },
  props: {
    items: [Boolean, Array],
    loading: [Boolean]
  },
  data: () => ({
    headers
  }),
  methods: {
    getMainImage(images, property) {
      if (!images.length > 0) return false;
      const mainImage = images.filter(image => image.IsMain);
      return mainImage[0][property];
    },
    createStockLevels(stockLevels) {
      if (stockLevels.length === 0) return "-";
      const levels = stockLevels.map(local => {
        return `<div>
          ${local.StockLevel}
        </div>`;
      });
      return levels.join("");
    },
    createStockLocations(stockLevels) {
      if (stockLevels.length === 0) return "-";
      const locations = stockLevels.map(local => {
        if (local.Location) {
          return `<div> ${local.Location.BinRack} </div>`;
        }
      });
      return locations.join("");
    }
  }
};
</script>

<style>
#relatedInventory .v-data-footer__select .v-select {
  margin: 0px 0px 8px 12px !important;
}
</style>
