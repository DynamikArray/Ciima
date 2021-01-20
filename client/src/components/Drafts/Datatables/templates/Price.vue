<template>
  <div id="priceWrapper" class="d-flex justify-start align-center w-100">
    <div v-if="label" class="d-flex justify-start align-center" :style="`min-width:${minWidth}`">
      <span class="overline mr-2">Price:</span>
    </div>

    <v-edit-dialog
      v-if="item.status.toLowerCase() != 'submitted'"
      persistent
      large
      @save="saveChanges(item.id, 'price', editValue)"
    >
      <div class="d-flex align-center w-100" :class="alignValue">
        <span class="subtitle-1 ml-3">{{ Number(item.price) | currency }}</span>
      </div>

      <template v-slot:input>
        <v-text-field v-model="editValue" label="Edit" single-line counter :rules="fieldRule"></v-text-field>
      </template>
    </v-edit-dialog>
    <div v-else class="d-flex align-center w-100" :class="alignValue">
      <span class="subtitle-1 ml-3">{{ Number(item.price) | currency }}</span>
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
    item: [Object],
    minWidth: {
      type: String,
      default: "75px"
    },
    alignValue: {
      type: String,
      default: "justify-center"
    }
  },
  data: () => {
    return {
      editValue: "",
      fieldRule: fieldRules.price
    };
  },
  created() {
    if (this.item) {
      this.editValue = this.item.price;
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
          if (results.result.affectedRows == 1 && results.result.changedRows == 1) {
            const strMessage = `${fieldName} was updated to ${fieldValue}`;
            this.item.price = fieldValue;
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
#priceWrapper {
  font-size: 90%;
}
#priceWrapper .subtitle-1 {
  line-height: 1.4em;
}
</style>
