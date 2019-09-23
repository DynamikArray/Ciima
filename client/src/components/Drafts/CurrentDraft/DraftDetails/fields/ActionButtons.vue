<template>
  <div class="d-flex justify-space-around w-100">
    <div class="d-flex">
      <v-btn :loading="draft.savingDraft" color="primary" @click="autofillDraft"
        ><v-icon class="mr-2">fa-magic</v-icon>Auto Fill</v-btn
      >
    </div>
    <div class="d-flex">
      <v-btn :loading="draft.savingDraft" color="success" @click="saveDraft"
        ><v-icon class="mr-2">fa-save</v-icon>Save Draft</v-btn
      >
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
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
    //
    //
    autofillDraft() {
      if (!this.titles.length > 0) {
        this.$toastr.w("No Titles selected for Automagically	&trade; .");
        return;
      }

      if (!this.issues.length > 0) {
        this.$toastr.w("No Issues selected for Automagically	&trade; .");
        return;
      }

      //issue numbers as array for use in method
      const issuesNumbs = this.issues.map(issue => {
        return issue.fullIssue;
      });

      //first last for title string
      const issueFirstLast = {};
      issueFirstLast.first = [...issuesNumbs].shift(); //leave original intact ;)
      issueFirstLast.last = [...issuesNumbs].pop(); //leave original intact ;)

      //issueNumbers list in draft
      this.draft.issueNumbers = issuesNumbs.join(" ");

      //publisher/year/date
      this.draft.publisher = this.titles[0].publisher;

      const coverDate = this.issues[0].coverDate;
      if (coverDate) {
        this.draft.publishedYear = format(coverDate, "YYYY");
        this.draft.publishedDate = format(coverDate, "MMM YYYY");
      }

      //location
      this.location = "EBAY-SETS-";

      //Fancy Title attempt
      this.draft.inventoryTitle = `${this.draft.titles[0].title}  ${
        this.draft.issueNumbers
      } Complete Set Run Lot ${issueFirstLast.first}-${issueFirstLast.last} ${
        this.draft.grade
      }`;

      //Tell user we did a thing
      this.$toastr.s("Values Automagically&trade; entered!");
    },
    //
    //
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
