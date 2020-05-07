<template>
  <div
    id="locationCodeWrapper"
    class="d-flex justify-start align-center w-100 my-2"
  >
    <div
      v-if="label"
      class="d-flex justify-start align-center"
      style="min-width:75px"
    >
      <span class="overline mr-2">Location:</span>
    </div>
    <div class="d-flex justify-start align-center">
      <v-edit-dialog
        persistent
        large
        @save="saveChanges(item.id, 'locationCode', editValue)"
      >
        <span class="locationCodeSpan subtitle-2  grey darken-4 py-1 px-2">{{
          item.locationCode
        }}</span>

        <template v-slot:input>
          <v-text-field
            v-model="editValue"
            label="Edit"
            single-line
            :rules="fieldRule"
            counter
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </div>
  </div>
</template>

<script>
import { OPEN_DRAFTS_UPDATE_DRAFT } from "@/store/action-types";
import { UPDATE_API_STATUS } from "@/store/mutation-types";
import { fieldRules } from "@/components/Draft/Lot/formUtil/formHelpers";

export default {
  props: {
    label: [Boolean],
    item: [Object]
  },
  data: () => {
    return {
      editValue: "",
      fieldRule: fieldRules.locationCode
    };
  },
  created() {
    if (this.item) {
      this.editValue = this.item.locationCode;
    }
  },
  methods: {
    saveChanges(id, fieldName, fieldValue) {
      this.$store
        .dispatch(`openDrafts/${OPEN_DRAFTS_UPDATE_DRAFT}`, {
          id,
          fieldName,
          fieldValue
        })
        .then(results => {
          if (
            results.result.affectedRows == 1 &&
            results.result.changedRows == 1
          ) {
            const strMessage = `${fieldName} was updated to ${fieldValue}`;
            this.item.locationCode = fieldValue;
            this.$toastr.s(strMessage);
            this.$store.commit(`api/${UPDATE_API_STATUS}`, strMessage, {
              root: true
            });
          }
        })
        .catch(e => {
          this.$toastr.e(`ERROR: ${e.message}`);
        });
    }
  }
};
</script>

<style scoped>
#locationCodeWrapper {
  font-size: 90%;
}

#locationCodeWrapper .subtitle-1 {
  line-height: 1.4em;
}

#locationCodeWrapper .locationCodeSpan {
  border-radius: 12px;
}
</style>
