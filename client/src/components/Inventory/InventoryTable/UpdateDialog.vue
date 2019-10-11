<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn color="warning" small v-on="on" style="min-width:40px;">
        <v-icon small>fas fa-edit</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        Update Stock Location or Quantity
      </v-card-title>
      <v-card-text>
        <div class="subtitle-2 w-100 text-center">
          Press enter to save field changes
        </div>
        <v-form v-model="isValid" @submit.prevent="handleSubmits">
          <v-row>
            <v-col cols="8">
              <v-text-field
                autofocus
                v-model="BinRack"
                id="BinRack"
                name="BinRack"
                outlined
                label="BinRack"
                hint="BinRack for this item"
                @keydown="handleKeyDownBinRack"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="StockLevel"
                id="StockLevel"
                name="StockLevel"
                outlined
                label="StockLevel"
                hint="StockLevel for this item"
                @keydown="handleKeyDownStockLevel"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <div class="d-flex justify-start">
          <div class="d-flex align-center">
            <v-btn color="red" @click="cancelDialog"
              ><v-icon class="mr-1">fa fa-times-circle</v-icon>Cancel
            </v-btn>
          </div>
          <div class="d-flex align-center mx-2"></div>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { UPDATE_INVENTORY_ITEM_LEVELS } from "@/store/action-types.js";

export default {
  props: {
    stockLevel: [Object]
  },
  data() {
    return {
      StockLevel: false,
      BinRack: false,
      dialog: false,
      isValid: false
    };
  },
  created() {
    //set props equal to new local values
    const item = this.stockLevel;
    this.BinRack = item.Location.BinRack;
    this.StockLevel = item.StockLevel;
  },
  methods: {
    handleKeyDownBinRack({ key }) {
      if (key !== "Enter") return;
      const data = this.getUpdatedFields("BinRack");
      this.handleSubmits(data);
    },
    handleKeyDownStockLevel({ key }) {
      if (key !== "Enter") return;
      const data = this.getUpdatedFields("StockLevel");
      this.handleSubmits(data);
    },
    async handleSubmits(data) {
      try {
        const resp = await this.$store.dispatch(
          `linnworks/${UPDATE_INVENTORY_ITEM_LEVELS}`,
          {
            ...data,
            toastr: this.$toastr
          }
        );
        if (!resp.error) this.handleAfterSubmit();
      } catch (err) {
        this.$toastr.e(err);
      }
    },
    handleAfterSubmit() {
      this.stockLevel.StockLevel = this.StockLevel;
      this.stockLevel.Location.BinRack = this.BinRack;
      this.$emit("update:stockLevel", this.stockLevel);
    },
    cancelDialog() {
      this.dialog = false;
    },
    getUpdatedFields(type) {
      //grab our updated values
      const { BinRack, StockLevel } = this;
      const { StockItemId, Location } = this.stockLevel;
      const { LocationName, StockLocationId } = Location;

      //Build Data Object per Type
      switch (type) {
        case "BinRack":
          return {
            inventoryItemId: StockItemId,
            fieldName: 13, //Bin Rack Enum Value
            fieldValue: BinRack,
            locationId: StockLocationId,
            changeSource: BinRack
          };
          break;
        case "StockLevel":
          return {
            inventoryItemId: StockItemId,
            fieldName: 10, //Stock Level Enum Value
            fieldValue: StockLevel,
            locationId: StockLocationId,
            changeSource: StockLevel
          };
          break;
      }
    }
  }
};
</script>

<style scoped></style>
