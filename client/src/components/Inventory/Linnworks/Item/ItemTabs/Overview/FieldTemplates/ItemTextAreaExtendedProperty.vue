<script>
import { UPDATE_EXTENDED_PROPERTY_SELECTED_LINNWORKS_ITEM } from "@/store/action-types.js";
import EditDialog from "./EditDialog";

import ItemTextArea from "./ItemTextArea";
export default {
  extends: ItemTextArea,
  methods: {
    async saveChanges(itemId, field, value) {
      if (this.hasErrors) {
        this.$toastr.e("Field has errors, or is invalid!");
      } else {
        const resp = await this.$store.dispatch(
          `linnworks/inventory/selectedItem/${UPDATE_EXTENDED_PROPERTY_SELECTED_LINNWORKS_ITEM}`,
          {
            fkStockItemId: itemId,
            PropertyValue: value,
            ProperyName: field
          }
        );

        const { result, error } = resp;
        if (result) {
          this.$toastr.defaultTimeout = 1500;
          this.$toastr.s(`${field} update success!`, result.toUpperCase());
          this.$emit("update:itemValue", value);
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
