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
  data: () => ({
    ebayStoreCategoryIdOne: 5837309015
  }),
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
        this.$toastr.w("No Title(s) selected to get Comic data from.");
        return;
      }

      if (!this.issues.length > 0) {
        this.$toastr.w("No Issue(s) selected to get Comic data from.");
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

      //bring in upc from 1st issue
      const { upc } = this.issues[0];
      this.draft.upc = upc;

      //set ebayCat from db list
      //const { eBayCat1 } = this.issues[0];
      //this.draft.ebaySiteCategoryId = eBayCat1;

      //set 1st store cat
      this.draft.ebayStoreCategoryIdOne = this.ebayStoreCategoryIdOne;

      //Tell user we did a thing
      this.$toastr.s(
        "Form data Automagically&trade; filled in using selected title & issues!"
      );
    }
    //
    //
  }
};
</script>

<style scoped></style>
