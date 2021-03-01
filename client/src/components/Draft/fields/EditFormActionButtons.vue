<template>
  <div class="d-flex justify-space-around w-100">
    <div class="d-flex mx-3">
      <v-btn :loading="draft.savingDraft" color="red" @click="cancelEdit"
        ><v-icon class="mr-2">fa-save</v-icon>Cancel Edit</v-btn
      >
    </div>
    <div class="d-flex mx-3">
      <v-btn :loading="draft.savingDraft" color="success" @click="updateDraft"
        ><v-icon class="mr-2">fa-save</v-icon>Update Draft</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { EDIT_DRAFT_SAVE } from "@/store/action-types.js";
import { EDIT_DRAFT_CLEAR, UPDATE_API_STATUS } from "@/store/mutation-types.js";

export default {
  props: {
    validateForm: [Function],
    resetForm: [Function]
  },
  computed: {
    ...mapState({
      draft: state => state.editDraft
    })
  },
  methods: {
    //
    async updateDraft() {
      if (this.validateForm()) {
        const { draft } = this;

        try {
          //make the calls
          const result = await this.$store.dispatch(`editDraft/${EDIT_DRAFT_SAVE}`, draft);

          if (result) {
            this.$toastr.s("Draft Updated!");
            this.updateStatus(draft, false);
            //clear the draft
            this.$store.commit(`editDraft/${EDIT_DRAFT_CLEAR}`);
            //goto title search
            this.$router.push({ name: "drafts" });
          }
        } catch (error) {
          this.updateStatus(draft, error);
          this.$toastr.e(error.message);
        }
      }
    },
    updateStatus(draft, error) {
      if (error) this.$store.commit(`api/${UPDATE_API_STATUS}`, error.message);

      if (!error) {
        const title = draft.inventoryTitle;
        const qty = draft.quantity;
        const location = draft.locationCode;
        const price = this.$options.filters.currency(draft.price);

        this.$store.commit(`api/${UPDATE_API_STATUS}`, `Qty(${qty}) @ ${price} | ${location} | ${title} - UPDATED!`);
      }
    },
    /* -- */
    async cancelEdit() {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Cancel the draft edit?</h3>
        <p>This will cancel your changes and return you to drafts screeen</p>`,
        {
          title: " Are you sure?"
        }
      );
      if (confirm) {
        this.$store.commit(`editDraft/${EDIT_DRAFT_CLEAR}`);
        this.$router.push("/drafts");
      }
    }
  }
};
</script>

<style scoped></style>
