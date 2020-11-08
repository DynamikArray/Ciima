<template>
  <div id="issueNumbersWrapper" class="d-flex justify-start align-center w-100">
    <v-edit-dialog
      persistent
      large
      @save="saveChanges(item, 'issueNumbers', editValue)"
    >
      <v-slide-x-reverse-transition mode="out-in">
        <div
          class="d-flex align-center w-100"
          :class="alignValue"
          :key="`issueNumbers-${item.issueNumbers}`"
        >
          <div
            v-if="label"
            class="d-flex justify-start align-center"
            style="min-width:75px"
          >
            <span class="overline mr-1">Issues:</span>
          </div>
          <div class="d-flex justify-start align-center w-100">
            <span class="subtitle-1">{{ item.issueNumbers }}</span>
          </div>
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
  </div>
</template>

<script>
import { OPEN_DRAFTS_UPDATE_DRAFT } from "@/store/action-types";
import { UPDATE_API_STATUS } from "@/store/mutation-types";

export default {
  props: {
    label: {
      type: [Boolean],
      default: true
    },
    alignValue: {
      type: [String],
      default: "justify-center"
    },
    item: [Object]
  },
  created() {
    if (this.item) {
      this.editValue = this.item.issueNumbers;
    }
  },
  data: () => ({
    hasErrors: false,
    editValue: "",
    rules: [v => !!v || "Issue Numbers is a required field"]
  }),
  methods: {
    handleError(error) {
      this.hasErrors = error;
    },
    saveChanges(item, fieldName, fieldValue) {
      if (this.hasErrors) {
        this.$toastr.e("Price has errors, or is invalid!");
      } else {
        this.$store
          .dispatch(`openDrafts/${OPEN_DRAFTS_UPDATE_DRAFT}`, {
            id: item.id,
            fieldName,
            fieldValue
          })
          .then(results => {
            if (
              results.result.affectedRows == 1 &&
              results.result.changedRows == 1
            ) {
              const strMessage = `${fieldName} was updated to ${fieldValue}`;
              this.item.price = fieldValue;
              this.$toastr.s(strMessage);
              this.$store.commit(`api/${UPDATE_API_STATUS}`, strMessage, {
                root: true
              });
              item.issueNumbers = fieldValue;
              this.$emit("update:item", item);
            }
          })
          .catch(e => {
            this.$toastr.e(`Error: ${e.messsage}`);
          });
      }
    }
  }
};
</script>

<style scoped>
#issueNumbersWrapper {
  font-size: 100%;
}
#issueNumbersWrapper .subtitle-1 {
  line-height: 1.4em;
}
</style>
