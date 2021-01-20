<template>
  <div class="">
    <v-edit-dialog
      v-if="item.status.toLowerCase() != 'submitted'"
      ref="dialog"
      persistent
      large
      @save="saveChanges(item.id, 'quantity', editValue)"
    >
      <div class="d-flex justify-start align-center" style="min-width:75px">
        <span class="overline mr-2">Quantity:</span>
        <span class="subtitle-1"> {{ item.quantity }}</span>
      </div>

      <template v-slot:input>
        <v-form ref="form" v-on:submit.prevent class="pt-2">
          <v-text-field
            v-model="editValue"
            label="Update quantity field"
            :rules="getCorrectRuleType"
            counter
            style="width:300px"
          ></v-text-field>
        </v-form>
      </template>
    </v-edit-dialog>
    <div v-else class="d-flex justify-start align-center" style="min-width:75px">
      <span class="overline mr-2">Quantity:</span>
      <span class="subtitle-1"> {{ item.quantity }}</span>
    </div>
  </div>
</template>

<script>
import { OPEN_DRAFTS_UPDATE_DRAFT } from "@/store/action-types";
import { UPDATE_API_STATUS } from "@/store/mutation-types";

export default {
  props: {
    item: [Object]
  },

  data: () => {
    return {
      editValue: ""
    };
  },

  created() {
    if (this.item) {
      this.editValue = this.item.quantity;
    }
  },

  computed: {
    getCorrectRuleType() {
      return [
        v => !!v || "Quantity is a required field",
        v => !!Number(v) > 0 || "Quantity must be greater than zero or is not a number"
      ];
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
          if (results.result.affectedRows == 1 && results.result.changedRows == 1) {
            const strMessage = `${fieldName} was updated to ${fieldValue}`;
            this.item[fieldName] = fieldValue;
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

<style>
.theme--dark.v-small-dialog__menu-content,
.theme--dark.v-small-dialog__actions {
  background: #2d2d2d;
}
</style>
