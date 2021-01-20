<template>
  <div class="">
    <v-edit-dialog
      v-if="item.status.toLowerCase() != 'submitted'"
      ref="dialog"
      persistent
      large
      @save="saveChanges(item.id, 'inventoryTitle', editValue)"
    >
      <span class="subtitle-1">{{ item.inventoryTitle }} </span>

      <template v-slot:input>
        <v-form ref="form" v-on:submit.prevent>
          <v-textarea
            rows="2"
            v-model="editValue"
            label="Edit"
            single-line
            :rules="getCorrectRuleType"
            counter
            style="width:500px"
          ></v-textarea>
        </v-form>
      </template>
    </v-edit-dialog>
    <span v-else class="subtitle-1">{{ item.inventoryTitle }} </span>
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
      this.editValue = this.item.inventoryTitle;
    }
  },

  computed: {
    getCorrectRuleType() {
      const inventoryTitle = [
        v => !!v || "Inventory Title is a required field",
        v => {
          if (v.toLowerCase().includes("mystery")) return "Ebay does not allow the word Mystery, please change this word";
          return false;
        },
        v => v.length <= 80 || "inventoryTitle must be less than 80 characters"
      ];

      return inventoryTitle;
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
            this.item.inventoryTitle = fieldValue;
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
