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
        ref="dialog"
        persistent
        large
        @save="saveChanges(item.id, 'locationCode', editValue)"
      >
        <span class="locationCodeSpan subtitle-2  grey darken-4 py-1 px-2">{{
          item.locationCode
        }}</span>

        <template v-slot:input>
          <v-form ref="form" v-on:submit.prevent>
            <v-text-field
              v-model="editValue"
              @input="
                v => {
                  editValue = v.toUpperCase();
                }
              "
              label="Edit"
              single-line
              :rules="getCorrectRuleType"
              counter
            ></v-text-field>
          </v-form>
        </template>
      </v-edit-dialog>
    </div>
  </div>
</template>

<script>
import { OPEN_DRAFTS_UPDATE_DRAFT } from "@/store/action-types";
import { UPDATE_API_STATUS } from "@/store/mutation-types";

export default {
  props: {
    label: [Boolean],
    item: [Object]
  },
  data: () => {
    return {
      editValue: ""
    };
  },

  created() {
    if (this.item) {
      this.editValue = this.item.locationCode;
    }
  },

  computed: {
    getCorrectRuleType() {
      let LOCATION_PREFIX = false;
      if (this.item.draftType === "lots") LOCATION_PREFIX = "EBAY-LOTS-";
      if (this.item.draftType === "sets") LOCATION_PREFIX = "EBAY-SETS-";
      if (this.item.draftType === "singles") LOCATION_PREFIX = "EBAY-SINGLES-";

      const locationCode = [
        v => !!v || "Location code is a required field",
        v => {
          if (!v.startsWith(LOCATION_PREFIX))
            return `Location code must start with ${LOCATION_PREFIX}`;
          return false;
        },
        v => {
          if (v == LOCATION_PREFIX) return "You must enter a Location code";
          return false;
        },
        v => v.length <= 50 || "Location Code must be less than 50 characters"
      ];

      return locationCode;
    }
  },

  methods: {
    saveChanges(id, fieldName, fieldValue) {
      if (!this.$refs.form.validate()) {
        //little hack to reshow the dialog when not validated
        setTimeout(() => {
          this.$refs.dialog.$data.isActive = true;
        }, 1 * 100);
        return;
      }

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
