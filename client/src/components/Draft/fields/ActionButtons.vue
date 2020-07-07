<template>
  <div class="d-flex justify-space-around w-100">
    <div class="d-flex mx-3">
      <v-btn :loading="draft.savingDraft" color="red" @click="resetDraft"
        ><v-icon class="mr-2">fa-save</v-icon>Reset Form</v-btn
      >
    </div>
    <div class="d-flex mx-3">
      <v-btn :loading="draft.savingDraft" color="success" @click="saveDraft"
        ><v-icon class="mr-2">fa-save</v-icon>Save Draft</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CURRENT_DRAFT_SAVE, OPEN_DRAFTS_FETCH } from "@/store/action-types.js";
import {
  CURRENT_DRAFT_CLEAR,
  UPDATE_API_STATUS
} from "@/store/mutation-types.js";

export default {
  props: {
    validateForm: [Function],
    resetForm: [Function]
  },
  computed: {
    ...mapState({
      draft: state => state.currentDraft,
      titles: state => state.currentDraft.titles,
      issues: state => state.currentDraft.issues,
      defaultProductType: state => state.settings.defaultProductType
    })
  },
  methods: {
    //? move to vuex getter ?
    getImageUrlsFromIssues(issues) {
      if (issues.length > 0 && issues.length < 12) {
        const issueUrls = issues.map(issue => {
          return { imageUrl: issue.imageUrl };
        });
        return issueUrls;
      }
      return [];
    },

    //
    async saveDraft() {
      if (this.validateForm()) {
        const { draft } = this;

        const issues = draft.issues;

        draft.other_images = this.getImageUrlsFromIssues(issues);

        draft.main_image = this.draft.coverPhoto;
        draft.draftType = this.defaultProductType;

        try {
          //make the calls
          const result = await this.$store.dispatch(
            `currentDraft/${CURRENT_DRAFT_SAVE}`,
            draft
          );

          if (result) {
            this.$toastr.s("Draft Saved!");
            this.updateStatus(draft, false);
            //clear the draft
            this.$store.commit(`currentDraft/${CURRENT_DRAFT_CLEAR}`);
            //goto title search
            this.$router.push({ name: "titles" });
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

        this.$store.commit(
          `api/${UPDATE_API_STATUS}`,
          `Qty(${qty}) @ ${price} | ${location} | ${title} - SAVED!`
        );
      }
    },
    /* -- */
    async resetDraft() {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Reset the current draft?</h3>
        <p>This will clear all form fields and remove all Photos, Titles and Issues</p>`,
        {
          title: " Are you sure?"
        }
      );
      if (confirm) this.$store.commit(`currentDraft/${CURRENT_DRAFT_CLEAR}`);
    }
  }
};
</script>

<style scoped></style>
