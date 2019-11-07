<template>
  <div class="relatedInventoryWrapper">
    <div v-if="Array.isArray(items)" class="textShadow">
      <div
        class="text-left pa-1 pl-4 grey darken-2 white--text text--lighten-2"
      >
        <v-icon small class="mr-2">fa fa-boxes</v-icon>{{ titleMessage }}
      </div>

      <v-data-table
        dense
        id="relatedInventory"
        :loading="loading"
        :headers="headers"
        :items-per-page="5"
        :items="items"
        class="elevation-1"
        :footer-props="footerProps"
      >
        <template v-slot:item.imgThumb="{ item }">
          <ImagesHoverOver
            :imageFull="item.imageFull"
            :imageThumb="item.imageThumb"
            :minHeight="35"
            :maxHeight="30"
            :maxWidth="30"
          />
        </template>

        <template v-slot:item.location.name="{ item }">
          <EditFieldDialog
            :key="item.stockItemId"
            :originalValue.sync="item.location.name"
            :itemId="item.stockItemId"
            :locationId="item.location.id"
            fieldName="BinRack"
            :textfieldWidth="320"
          ></EditFieldDialog>
        </template>

        <template v-slot:item.location.qty="{ item }">
          <EditFieldDialog
            :key="item.stockItemId"
            :originalValue.sync="item.location.qty"
            :itemId="item.stockItemId"
            :locationId="item.location.id"
            fieldName="StockLevel"
            :textfieldWidth="150"
          ></EditFieldDialog>
        </template>

        <template v-slot:item.action="{ item }">
          <button>Action</button>
        </template>
      </v-data-table>
    </div>

    <div v-else class="text-center pa-2">
      <h3>No Related Inventory Results</h3>
    </div>
  </div>
</template>

<script>
import ImagesHoverOver from "@/components/Images/ImageHoverOver";
import { headers } from "./tableHeaders.js";
import EditFieldDialog from "@/components/Inventory/InventoryTable/EditFieldDialog";

export default {
  components: {
    ImagesHoverOver,
    EditFieldDialog
  },
  props: {
    items: [Boolean, Array],
    loading: [Boolean],
    searchString: [String]
  },
  data: () => ({
    headers,
    footerProps: {
      "items-per-page-options": [5, 10]
    }
  }),
  computed: {
    titleMessage() {
      const { items, searchString } = this;
      if (items.length) {
        return `${items.length} Similar titles containing: ${searchString}`;
      }
      return `Similar titles: ${searchString}`;
    }
  },
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
