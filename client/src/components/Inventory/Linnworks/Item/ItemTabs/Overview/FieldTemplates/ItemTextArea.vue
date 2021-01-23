<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="d-flex align-center justify-space-between" :key="`${fieldName}_${unlocked}_${itemId}`">
      <slot v-if="!unlocked">
        <div class="d-flex align-baseline justify-start">
          <h4 class="my-0 mr-2">
            {{ fieldLabel }}
          </h4>
          <h3 class="white--text textShadow my-0">
            {{ itemValue }}
          </h3>
        </div>
      </slot>

      <slot name="editField" v-if="unlocked" class="w-100">
        <div id="editFieldSlot" class="w-100">
          <EditDialog
            :key="`editdialog_${fieldName}_${itemId}`"
            persistent
            large
            @save="saveChanges(itemId, fieldName, editValue, editValue, locationId)"
            @cancel="editValue = itemValue"
          >
            <div class="d-flex align-center justify-end w-100" id="editFieldWrapper">
              <h4 class="my-0 mr-2">
                {{ fieldLabel }}
              </h4>

              <v-textarea
                :key="`textarea_disabled_${fieldName}_${itemId}`"
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
                  <v-btn color="primary"><v-icon>fa fa-edit</v-icon></v-btn>
                </template>
              </v-textarea>
            </div>

            <template v-slot:input>
              <div class="itemTextFieldInputSlot">
                <h3 class="my-1 textShadow">Edit {{ fieldLabel }}</h3>
                <v-textarea
                  :key="`textarea_editable_${fieldName}_${itemId}`"
                  autocomplete="off"
                  autofocus
                  dense
                  hide-details
                  v-model="editValue"
                  :id="fieldId"
                  :label="fieldLabel"
                  :rules="rules"
                  :hint="fieldHint"
                  filled
                  :full-width="true"
                  background-color="grey darken-4"
                />
              </div>
            </template>
          </EditDialog>
        </div>
      </slot>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
//import { UPDATE_API_STATUS } from "@/store/mutation-types.js";
import { UPDATE_FIELD_SELECTED_LINNWORKS_ITEM } from "@/store/action-types.js";
import EditDialog from "./EditDialog";

export default {
  props: {
    unlocked: { type: [Boolean], default: false },
    itemValue: { type: [String] },
    itemId: { type: [String] },
    locationId: { type: [String, Boolean], default: false },
    fieldName: { type: [String] },
    fieldId: { type: [String] },
    fieldLabel: { type: [String] },
    fieldHint: { type: [String] },
    rules: { type: [Array] }
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
  components: {
    EditDialog
  },
  methods: {
    handleError(error) {
      this.hasErrors = error;
    },
    async saveChanges(itemId, field, value, changeSource, locationId) {
      if (this.hasErrors) {
        this.$toastr.e("Field has errors, or is invalid!");
      } else {
        const resp = await this.$store.dispatch(`linnworks/inventory/selectedItem/${UPDATE_FIELD_SELECTED_LINNWORKS_ITEM}`, {
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
