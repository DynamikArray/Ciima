<template>
  <v-edit-dialog
    persistent
    large
    @save="saveChanges(item, 'Price', editValue)"
    :key="item[idField]"
  >
    <div class="d-flex align-center w-100 body-1" :class="alignValue">
      {{ Number(item[priceField]) | currency }}
    </div>

    <template v-slot:input>
      <v-text-field
        autofocus
        v-model="editValue"
        label="Edit"
        single-line
        counter
        :rules="rules"
        @update:error="handleError"
      ></v-text-field>
    </template>
  </v-edit-dialog>
</template>

<script>
import { UPDATE_API_STATUS } from "@/store/mutation-types.js";
import { UPDATE_ITEM_PRICE } from "@/store/action-types.js";

export default {
  props: {
    alignValue: {
      type: [String],
      default: "justify-center"
    },
    item: [Object],
    priceField: {
      type: [String],
      default: "price"
    },
    idField: {
      type: [String],
      default: "stockItemId"
    },
    otherFields: {
      type: [Array],
      default: []
    }
  },
  data: () => ({
    hasErrors: false,
    editValue: "",
    rules: [
      v => !!v || "Price is a required field",
      v =>
        !!Number(v) > 0 || "Price must be greater than zero or is not a number"
    ]
  }),
  created() {
    if (this.item) {
      this.editValue = this.item[this.priceField];
    }
  },
  watch: {
    item(newVal) {
      this.editValue = newVal[this.priceField];
    }
  },
  methods: {
    handleError(error) {
      this.hasErrors = error;
    },
    saveChanges(item, field, price) {
      if (this.hasErrors) {
        this.$toastr.e("Price has errors, or is invalid!");
      } else {
        this.$store
          .dispatch(`linnworks/${UPDATE_ITEM_PRICE}`, {
            inventoryItemId: item[this.idField],
            fieldValue: price
          })
          .then(resp => {
            const { result, error } = resp;
            if (result) {
              this.$store.commit(
                `api/${UPDATE_API_STATUS}`,
                `Saved ${field} value of ${price}`,
                { root: true }
              );
              this.$toastr.s("Price update success!", result);
              const updatedItem = this.updateOtherFields(item, price);
              this.$emit("update:item", updatedItem);
              this.$emit("itemUpdated", updatedItem);
            }
            if (!result && error) this.$toastr.e("Price not updated!", error);
          })
          .catch(err => {
            this.$toastr.e("Price not updated!", err);
          });
      }
    },
    updateOtherFields(item, price) {
      item[this.priceField] = price;
      if (this.otherFields.length > 0) {
        this.otherFields.map(fieldName => {
          item[fieldName] = price;
        });
      }
      return item;
    }
  }
};
</script>

<style scoped></style>
