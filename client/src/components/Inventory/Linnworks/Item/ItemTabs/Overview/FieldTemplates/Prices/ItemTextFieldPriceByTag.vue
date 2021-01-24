<script>
//import { UPDATE_API_STATUS } from "@/store/mutation-types.js";
//import { UPDATE_FIELD_SELECTED_LINNWORKS_ITEM } from "@/store/action-types.js";
import ItemTextFieldPrice from "./ItemTextFieldPrice";
import EditDialog from "../EditDialog";

export default {
  extends: ItemTextFieldPrice,
  methods: {
    async saveChanges(itemId, field, value, changeSource, locationId) {
      console.log("Handle price save by Tag");
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
