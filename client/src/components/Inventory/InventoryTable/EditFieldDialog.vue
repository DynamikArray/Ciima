<template>
  <div>
    <v-edit-dialog @save="onSave()" @cancel="onCancel()">
      {{ fieldValue }}
      <template v-slot:input>
        <v-text-field
          id="editFieldDialogField"
          :style="`width: ${textfieldWidth}px;`"
          v-model="fieldValue"
          :rules="[max55chars]"
          label="Edit"
          single-line
          counter
        ></v-text-field>
      </template>
    </v-edit-dialog>

    <v-snackbar v-model="snackbar" :color="snackColor" top right>
      <span v-html="snackText"></span>
      <v-btn text @click="snackbar = false">
        <v-icon small>fa-times-circle</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { UPDATE_INVENTORY_ITEM_LEVELS } from "@/store/action-types.js";

import { UPDATE_API_STATUS } from "@/store/mutation-types.js";

export default {
  props: {
    originalValue: [String, Number, Boolean],
    itemId: [String],
    locationId: [String],
    fieldName: [String],
    textfieldWidth: {
      type: Number,
      default: 300
    }
  },
  data: () => ({
    snackColor: "info",
    snackText: "",
    snackbar: false,
    max55chars: v => v.length <= 55 || "Input too long!",
    fieldValue: ""
  }),
  watch: {
    originalValue: function(newVal) {
      this.fieldValue = newVal;
    }
  },
  created() {
    this.fieldValue = this.originalValue;
  },
  methods: {
    getFieldEnum(field) {
      switch (field) {
        case "BinRack":
          return 13;
          break;
        case "StockLevel":
          return 10;
      }
    },
    onCancel() {
      this.fieldValue = this.originalValue;
    },
    onSave() {
      const params = {
        inventoryItemId: this.itemId,
        fieldName: this.getFieldEnum(this.fieldName),
        fieldValue: this.fieldValue,
        locationId: this.locationId,
        changeSource: this.fieldValue
      };

      this.$store
        .dispatch(`linnworks/${UPDATE_INVENTORY_ITEM_LEVELS}`, params)
        .then(resp => {
          const { result } = resp;
          if (result) this.fieldSaved();
          if (!result) this.fieldNotSaved();
        })
        .catch(err => {
          this.fieldNotSaved();
        });
    },
    fieldSaved() {
      //update our parent values
      this.$emit("update:originalValue", this.fieldValue);

      //update our status bar
      this.$store.commit(
        `api/${UPDATE_API_STATUS}`,
        `Saved ${this.fieldName} value of ${this.fieldValue}`,
        {
          root: true
        }
      );
      //handle snackbar
      this.showSnackbar(
        "success",
        `Saved ${this.fieldName} value of <br/><b>${this.fieldValue}</b>!`
      );
    },
    fieldNotSaved() {
      //reset our local values with original
      this.fieldValue = this.originalValue;
      //update our status bar
      this.$store.commit(
        `api/${UPDATE_API_STATUS}`,
        `Error trying to save ${this.fieldName} with value of ${
          this.fieldValue
        }`,
        {
          root: true
        }
      );
      this.showSnackbar(
        "red",
        `Error trying to save ${this.fieldName} value of <br/><b>${
          this.fieldValue
        }</b>!`
      );
    },
    showSnackbar(color, text) {
      this.snackColor = color;
      this.snackText = text;
      this.snackbar = true;
    }
  }
};
</script>

<style>
#editFieldDialogField {
  text-align: center;
}
</style>
