<template>
  <v-edit-dialog persistent large @save="saveChanges(item, 'Price', editValue)">
    <v-slide-x-reverse-transition mode="out-in">
      <div
        class="d-flex align-center w-100"
        :class="alignValue"
        :key="`price-${Date.now()}-${item.price}`"
      >
        {{ Number(item.price) | currency }}
      </div>
    </v-slide-x-reverse-transition>

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
    item: [Object]
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
      this.editValue = this.item.price;
    }
  },
  watch: {
    item(newVal) {
      this.editValue = newVal.price;
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
            inventoryItemId: item.stockItemId,
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
              item.price = price;
              this.$emit("update:item", item);
            }
            if (!result && error) this.$toastr.e("Price not updated!", error);
          })
          .catch(err => {
            this.$toastr.e("Price not updated!", err);
          });
      }
    }
  }
};
</script>

<style scoped></style>
