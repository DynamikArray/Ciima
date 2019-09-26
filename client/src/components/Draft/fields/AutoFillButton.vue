<template>
  <div class="d-flex justify-space-around w-100">
    <div class="d-flex">
      <v-btn :loading="draft.savingDraft" color="primary" @click="autofillDraft"
        ><v-icon class="mr-2">fa-magic</v-icon>Auto Fill</v-btn
      >
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import { mapState } from "vuex";

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

      //Fancy Title attempt
      this.draft.inventoryTitle = `${this.draft.titles[0].title}  ${
        this.draft.issueNumbers
      } Complete Set Run Lot ${issueFirstLast.first}-${issueFirstLast.last} ${
        this.draft.grade
      }`;

      //Tell user we did a thing
      this.$toastr.s("Values Automagically&trade; entered!");
    }
    //
    //
  }
};
</script>

<style scoped></style>
