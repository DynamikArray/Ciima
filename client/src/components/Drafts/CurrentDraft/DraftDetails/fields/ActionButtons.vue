<template>
  <div class="d-flex justify-center w-100">
    <div class="d-flex">
      <v-btn :loading="draft.savingDraft" color="success" @click="saveDraft"
        ><v-icon class="mr-2">fa-save</v-icon>Save Draft</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CURRENT_DRAFT_SAVE, OPEN_DRAFTS_FETCH } from "@/store/action-types.js";
import { CURRENT_DRAFT_CLEAR } from "@/store/mutation-types.js";

export default {
  props: {
    switchToTab: [Function]
  },
  computed: {
    ...mapState({
      draft: state => state.currentDraft,
      titles: state => state.currentDraft.titles,
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

    //
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

      this.$store.commit(`currentDraft/${CURRENT_DRAFT_CLEAR}`);

      await this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_FETCH}`);
      this.switchToTab(2);
    }
  }
};
</script>

<style scoped></style>
