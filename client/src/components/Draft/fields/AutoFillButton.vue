<template>
  <div class="d-flex flex-column grow justify-center">
    <div class="d-flex flex-row">
      <div class="flex flex-column justify-center">
        <div class="d-flex mx-1 justify-center">
          <v-btn
            :loading="draft.savingDraft"
            color="primary"
            @click="autofillDraft"
            ><v-icon class="mr-2">fa-magic</v-icon>Autofill</v-btn
          >
        </div>
        <div class="d-flex align-center grow">
          <h3 class="grow text-center">Set Defaults</h3>
        </div>
      </div>

      <div class="flex flex-column justify-center">
        <div class="d-flex mx-1 justify-center">
          <v-btn
            :loading="draft.savingDraft"
            color="primary"
            @click="autoFillTitleWithPublisherYear"
            ><v-icon class="mr-2">fab fa-leanpub</v-icon>Pub&Year</v-btn
          >
        </div>
        <div class="d-flex align-center grow">
          <h3 class="grow text-center">Enhance Title</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import { mapState } from "vuex";

export default {
  data: () => ({
    // TODO: get this from the util file
    ebayStoreCategories: {
      adult: "7146911015",
      sets: "5837309015",
      singles: "15969436015"
    }
  }),

  props: {},
  computed: {
    ...mapState({
      draft: state => state.currentDraft,
      titles: state => state.currentDraft.titles,
      issues: state => state.currentDraft.issues,
      defaultProductType: state => state.settings.defaultProductType
    })
  },
  methods: {
    getIssueNumbers() {
      const issueNumbs = this.issues.map(issue => {
        return issue.fullIssue;
      });
      return issueNumbs;
    },
    //
    //
    getPublisher() {
      const { publisher } = this.titles.find(
        titles => titles.publisher !== false
      );
      return publisher;
    },
    //
    //
    getCoverDate() {
      const { coverDate } = this.issues.find(
        issue => issue.coverDate !== false
      );
      return coverDate;
    },
    //
    //
    getUpc() {
      const { upc } = this.issues.find(issue => issue.upc !== false);
      return upc;
    },
    //
    //
    createTitleWithOptions(pub = false, year = false) {
      const issueNumbers = this.getIssueNumbers();
      const publisher = this.getPublisher();
      const coverDate = this.getCoverDate();
      //plceholder for values later
      let titleYear = "";
      if (coverDate) titleYear = format(coverDate, "YYYY");

      const title = [];
      //title
      title.push(this.draft.titles[0].title);
      //issue numbers
      title.push(this.draft.issueNumbers);
      //publisher
      if (pub) title.push(publisher);
      //year
      if (year) title.push(titleYear);

      if (this.defaultProductType === "sets") {
        //default verbiage for sets
        title.push("Complete Set Run Lot");
      }

      //if over 2 issues then add first and last
      if (issueNumbers.length >= 2) {
        title.push(`${[...issueNumbers].shift()}-${[...issueNumbers].pop()}`);
      }

      //grade
      title.push(this.draft.grade);
      //join it all up and ship it back
      return title.join(" ");
    },
    //
    //
    runDataCheck() {
      if (!this.titles.length > 0) {
        this.$toastr.w("No Title(s) selected to get Comic data from.");
        return false;
      }

      if (!this.issues.length > 0) {
        this.$toastr.w("No Issue(s) selected to get Comic data from.");
        return false;
      }
      return true;
    },
    //
    //
    autofillDraft() {
      if (!this.runDataCheck()) return false;

      //set 1st store cat
      this.draft.ebayStoreCategoryIdOne = this.ebayStoreCategoryIdOne;

      //if we have a default for this type set it
      this.draft.ebayStoreCategoryIdOne = this.ebayStoreCategories[
        this.defaultProductType
      ];

      if (this.defaultProductType === "singles") {
        this.draft.ebayStoreCategoryIdTwo = this.ebayStoreCategories[
          this.defaultProductType
        ];
      }

      if (this.defaultProductType === "adult") {
        this.handleAdultDefaults();
      }

      //issue Number
      this.draft.issueNumbers = this.getIssueNumbers().join(" ");

      //publisher/year/date
      this.draft.publisher = this.getPublisher();

      //bring in upc from 1st issue
      this.draft.upc = this.getUpc();

      //cover date
      const coverDate = this.getCoverDate();
      if (coverDate) {
        this.draft.publishedYear = format(coverDate, "YYYY");
        this.draft.publishedDate = format(coverDate, "MMM YYYY");
      }

      this.draft.inventoryTitle = this.createTitleWithOptions(false, false);

      //Tell user we did a thing
      this.$toastr.s(
        "Form data Automagically&trade; filled in using selected title & issues data!"
      );
    },
    autoFillTitleWithPublisherYear() {
      if (!this.runDataCheck()) return false;
      this.draft.inventoryTitle = this.createTitleWithOptions(true, true);
    },
    //
    //
    handleAdultDefaults() {
      //value sent to endpoint
      this.draft.ebaySiteCategoryId = "1604";
      //field used as displayy
      let field = document.getElementById("searchEbaySiteCategoryId");
      field.disabled = true;

      let label = document.querySelectorAll('[for="searchEbaySiteCategoryId"]');
      label[0].innerText =
        "Everything Else > Adult Only > Collectibles > Comics";

      //secondary store category should be auto filled
      this.draft.ebayStoreCategoryIdTwo = this.ebayStoreCategories[
        this.defaultProductType
      ];
    }
  }
};
</script>

<style scoped></style>
