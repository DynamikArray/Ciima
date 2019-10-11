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
        <v-form v-model="isValid" @submit.prevent="handleSubmits">
          <v-row>
            <v-col cols="8">
              <v-text-field
                autofocus
                dense
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
                dense
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

          <div class="text-center w-100">Press Enter to save changes.</div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState({
      updateResponse: state => state.linnworks.updateResponse
    })
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

    handleSubmits(data) {
      try {
        this.$store
          .dispatch(`linnworks/${UPDATE_INVENTORY_ITEM_LEVELS}`, {
            ...data,
            toastr: this.$toastr
          })
          .then(this.handleAfterSubmit);
      } catch (err) {
        this.$toastr.e(err);
      }
    },

    handleAfterSubmit() {
      if (!this.updateResponse.error) {
        this.stockLevel.StockLevel = this.StockLevel;
        this.stockLevel.Location.BinRack = this.BinRack;
        this.dialog = false;
        this.$emit("update:stockLevel", this.stockLevel);
      }
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
