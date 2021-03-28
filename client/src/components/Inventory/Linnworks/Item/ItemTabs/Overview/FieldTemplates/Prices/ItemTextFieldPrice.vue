<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="d-flex align-center justify-space-between" :key="`${fieldName}_${unlocked}_${itemId}`">
      <slot v-if="!unlocked">
        <div class="d-flex align-baseline justify-end">
          <h4 class="my-0 mr-2">{{ fieldLabel }}</h4>
          <h3 class="white--text textShadow my-0">
            <div v-if="itemValue">
              {{ itemValue | currency }}
            </div>
            <div v-else>
              <i>No {{ fieldLabel }} Found</i>
            </div>
          </h3>
        </div>
      </slot>

      <slot name="editField" v-if="unlocked" class="w-100">
        <div id="editFieldSlot" class="w-100">
          <div class="d-flex" v-if="itemValue">
            <EditDialog
              v-if="itemValue"
              dialogColor="grey darken-3"
              persistent
              large
              @save="saveChanges(itemId, fieldName, editValue, editValue, locationId)"
              @cancel="editValue = itemValue"
            >
              <div class="d-flex align-center justify-end w-100" id="editFieldWrapper">
                <h4 class="my-0 mr-2">{{ fieldLabel }}</h4>

                <v-text-field
                  dense
                  hide-details
                  :value="itemValue"
                  :id="fieldId"
                  :name="fieldName"
                  :label="fieldLabel"
                  :hint="fieldHint"
                  filled
                  :full-width="true"
                  disabled
                  background-color="grey darken-3"
                >
                  <template v-slot:append-outer>
                    <v-btn color="primary">
                      <v-icon small>fa fa-edit</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </div>

              <template v-slot:input>
                <div class="itemTextFieldInputSlot">
                  <div class="d-flex-column w-100 align-start justify-start">
                    <div class="d-flex flex-grow-1">
                      <h3 class="my-1 textShadow">Edit {{ fieldLabel }}</h3>
                    </div>
                    <div class="d-flex">
                      <v-text-field
                        autocomplete="off"
                        autofocus
                        :full-width="true"
                        filled
                        background-color="grey darken-4"
                        counter
                        :label="fieldLabel"
                        v-model="editValue"
                        :rules="rules"
                        @update:error="handleError"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </EditDialog>

            <div class="d-flex justify-center align-center">
              <v-btn
                class="textShadow ml-5"
                color="error"
                v-if="includeDeleteButton"
                @click="deletePrice(itemPriceId)"
                style="min-width:20px;"
              >
                <v-icon small class="">fa fa-times-circle</v-icon>
              </v-btn>
            </div>
          </div>

          <div v-else class="">
            <h3 class="white--text textShadow my-0">
              <i>No {{ fieldLabel }} Found</i>
            </h3>
          </div>
        </div>
      </slot>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
import { UPDATE_PRICE_SELECTED_LINNWORKS_ITEM, DELETE_DECLINE_PRICE_SELECTED_LINNWORKS_ITEM } from "@/store/action-types.js";
import EditDialog from "../EditDialog";

export default {
  props: {
    unlocked: { type: [Boolean], default: false },
    itemValue: { type: [Number, Boolean, String] },
    itemId: { type: [String] },
    locationId: { type: [String, Boolean], default: false },
    fieldName: { type: [String] },
    fieldId: { type: [String] },
    fieldLabel: { type: [String] },
    fieldHint: { type: [String] },
    rules: { type: [Array] },
    includeDeleteButton: { type: [Boolean], default: false },
    itemPriceId: { type: [String, Boolean], default: false }
  },
  components: {
    EditDialog
  },
  created() {
    if (this.itemValue) this.editValue = this.itemValue;
  },
  watch: {
    itemValue(newVal, oldVal) {
      if (newVal) this.editValue = this.itemValue;
    }
  },
  data: () => ({
    hasError: false,
    editValue: ""
  }),
  methods: {
    handleError(error) {
      this.hasErrors = error;
    },
    async saveChanges(itemId, field, value, changeSource, locationId) {
      if (this.hasErrors) {
        this.$toastr.e("Field has errors, or is invalid!");
      } else {
        const resp = await this.$store.dispatch(`linnworks/inventory/selectedItem/${UPDATE_PRICE_SELECTED_LINNWORKS_ITEM}`, {
          inventoryItemId: itemId,
          fieldValue: value,
          fieldName: field,
          changeSource,
          locationId
        });

        const { result, error } = resp;
        if (result) {
          this.$toastr.defaultTimeout = 1500;
          this.$toastr.s(`${field} update success!`, result);
          this.$emit("update:itemValue", value);
          this.$emit("hasChanges", true);
        }
        if (!result && error) this.$toastr.e(`${field} not updated!`, error);
      }
    },
    async deletePrice(inventoryItemPriceId) {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Delete this ${this.fieldLabel}?</h3>
        <p>This will remove the ${this.fieldLabel}. You cannot undo this operation. Are you sure you want to delete it?</p>`,
        { title: `Delete this ${this.fieldLabel}?` }
      );
      if (confirm) this.callDeletePrice(inventoryItemPriceId);
    },
    async callDeletePrice(inventoryItemPriceId) {
      const pkStockItemID = this.itemId;
      const resp = await this.$store.dispatch(
        `linnworks/inventory/selectedItem/${DELETE_DECLINE_PRICE_SELECTED_LINNWORKS_ITEM}`,
        { inventoryItemPriceId, pkStockItemID }
      );

      const { result, error } = resp;
      if (result) {
        this.$toastr.defaultTimeout = 1500;
        this.$toastr.s(`${this.fieldLabel} update success!`, result);
        this.$emit("update:itemValue", "0.00");
        this.$emit("hasChanges", true);
      }
      if (!result && error) this.$toastr.e(`${this.fieldLabel} not updated!`, error);
    }
  }
};
</script>

<style>
#editFieldWrapper .v-input__append-outer {
  margin: 2px 0px 0px 10px !important;
}

#editFieldSlot .v-small-dialog__activator__content {
  width: 100%;
}

.itemTextFieldInputSlot .v-messages__message {
  font-size: 150% !important;
  font-weight: bold !important;
}
</style>
