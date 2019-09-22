<template>
  <div class="d-flex">
    <v-btn :loading="draft.savingDraft" color="success" @click="saveDraft"
      ><v-icon class="mr-2">fa-save</v-icon>Save</v-btn
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CURRENT_DRAFT_SAVE, OPEN_DRAFTS_FETCH } from "@/store/action-types.js";

export default {
  computed: {
    ...mapState({
      draft: state => state.currentDraft,
      issues: state => state.currentDraft.issues
    })
  },
  methods: {
    //? move to vuex getter ?
    getImageUrlsFromIssues(issues) {
      if (issues.length > 0) {
        const issueUrls = issues.map(issue => {
          return { imageUrl: issue.imageUrl };
        });
        return issueUrls;
      }
      return [];
    },
    async saveDraft() {
      const { draft } = this;

      const issues = draft.issues;
      const titles = draft.titles;

      draft.other_images = this.getImageUrlsFromIssues(issues);
      draft.main_image = this.draft.coverPhoto;

      //Add a toastr
      draft.toastr = this.$toastr;

      //make the calls
      await this.$store.dispatch(`currentDraft/${CURRENT_DRAFT_SAVE}`, {
        draft
      });
      await this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_FETCH}`);
    }
  }
};
</script>

<style scoped></style>
