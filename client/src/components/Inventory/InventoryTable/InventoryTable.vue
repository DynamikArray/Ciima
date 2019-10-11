<template>
  <div>
    <v-card class="elevation-1">
      <v-card-text class="">
        <div class="d-flex justify-space-between">
          <SearchForm class="d-flex grow align-center" />
          <div class="d-flex align-center mx-2">
            <h4 class="mr-2">Ebay Sets Only:</h4>
          </div>
          <div class="d-flex align-center mx-1">
            <v-switch
              color="primary"
              class="mb-5"
              v-model="blnSetsOnly"
              :label="convertBlnToYesNo()"
              hide-details
            ></v-switch>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-divider class="my-3"></v-divider>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items-per-page="200"
      :items="getData"
      class="elevation-1"
    >
      <template v-slot:item.StockLevels="{ item }">
        <div v-html="createStockLevels(item.StockLevels)" />
      </template>

      <template v-slot:item.StockItemId="{ item }">
        <div v-html="createStockLocations(item.StockLevels)" />
      </template>

      <template v-slot:item.action="{ item }">
        <UpdateDialog
          v-for="(StockLevel, index) in item.StockLevels"
          :key="index + item.StockItemId"
          :stockLevel.sync="StockLevel"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { headers } from "./tableConfig.js";
import SearchForm from "@/components/Inventory/Search/SearchForm";
import UpdateDialog from "./UpdateDialog";

export default {
  components: {
    SearchForm,
    UpdateDialog
  },
  data() {
    return {
      headers,
      blnSetsOnly: true
    };
  },
  computed: {
    ...mapState({
      loading: state => state.linnworks.loading,
      inventory: state => state.linnworks.items
    }),
    ebaySetsOnly() {
      const setsOnly = this.inventory.filter(item => {
        return item.CategoryName == "EBAY-SETS";
      });
      return setsOnly;
    },
    getData() {
      if (this.blnSetsOnly) return this.ebaySetsOnly;
      return this.inventory;
    }
  },
  methods: {
    convertBlnToYesNo() {
      if (this.blnSetsOnly) return "Yes";
      return "No";
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

<style scoped></style>
