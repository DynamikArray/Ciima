<template>
  <div class="d-flex">
    <v-btn :loading="draft.savingDraft" color="success" @click="saveDraft"
      ><v-icon class="mr-2">fa-save</v-icon>Save</v-btn
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CURRENT_DRAFT_SAVE } from "@/store/action-types.js";

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
    saveDraft() {
      const { draft } = this;

      const issues = draft.issues;
      const titles = draft.titles;

      draft.other_images = this.getImageUrlsFromIssues(issues);
      draft.main_image = this.draft.coverPhoto;

      this.$store.dispatch(`currentDraft/${CURRENT_DRAFT_SAVE}`, draft);
    }
  }
};
</script>

<style scoped></style>
