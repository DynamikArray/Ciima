<template>
  <div class="d-flex flex-column justify-center flex-shrink-1">
    <div class="d-flex flex-row flex-wrap justify-center">
      <div class="d-flex flex-row justify-center mx-3 my-1">
        <div class="d-flex align-center ">
          <h3 class="mb-0 grow text-center">Add Defaults:</h3>
        </div>

        <div class="d-flex mx-1 justify-center">
          <v-btn
            :loading="draft.savingDraft"
            color="primary"
            @click="autofillDraft"
            ><v-icon class="mr-2">fa-magic</v-icon>Autofill</v-btn
          >
        </div>
      </div>

      <div class="d-flex flex-row justify-center mx-3 align-center my-1">
        <div class="d-flex align-center ">
          <h3 class="mb-0 grow text-center">Enhance Title:</h3>
        </div>
        <div class="d-flex mx-1 justify-center">
          <v-btn
            :loading="draft.savingDraft"
            color="primary"
            @click="autoFillTitleWithPublisherYear"
            ><v-icon class="mr-2">fab fa-leanpub</v-icon>Pub&Year</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import { mapState } from "vuex";

import { ebayStoreCategories } from "@/util/ebay/ebayStoreCategories.js";
import { mainCharactersList } from "@/util/data/mainCharactersList.js";
import {
  buildExtraDescriptionIssueNumbers,
  buildSingelsTitleWithIssueNumbers
} from "./helpers/buildExtraDescriptionIssueNumbers.js";

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
        return issue.issueNumber;
      });
      return issueNumbs;
    },

    getFullIssueNumbers() {
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
    getEbayCategory() {
      const { eBayCat1 } = this.issues.find(issue => issue.eBayCat1 !== false);
      return eBayCat1;
    },
    //
    //
    getUpc() {
      const { upc } = this.issues.find(issue => issue.upc !== false);
      return upc;
    },
    //
    //
    checkMainCharacterAgainstTitle(title) {
      const mainChars = mainCharactersList.filter((char, i) => {
        if (title.includes(char)) return true;
        return false;
      });
      if (mainChars.length > 0) return mainChars.shift();
      return "";
    },
    //
    //
    handleEbayStoreCategory2(publisher) {
      switch (publisher.toLowerCase()) {
        case "dark horse":
          this.draft.ebayStoreCategoryIdTwo = "360238015";
          break;
        case "marvel":
          this.draft.ebayStoreCategoryIdTwo = "360243015";
          break;
        case "dc":
          this.draft.ebayStoreCategoryIdTwo = "360242015";
          break;
        case "image":
          this.draft.ebayStoreCategoryIdTwo = "360239015";
          break;
        default:
          if (this.defaultProductType === "singles") {
            this.draft.ebayStoreCategoryIdTwo = this.ebayStoreCategories[
              this.defaultProductType
            ];
          }
      }
    },
    //
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

      switch (this.defaultProductType) {
        case "sets":
          const strIssues = this.issues
            .map(issue => issue.issueNumber)
            .join(" ");
          title.push(`${this.draft.titles[0].title} ${strIssues}`);
          break;
        case "singles":
          const strTitle = buildSingelsTitleWithIssueNumbers(this.issues);
          title.push(strTitle);
          break;
        default:
          //title
          title.push(this.draft.titles[0].title);
          //issue numbers
          if (issueNumbers.length < 15) {
            title.push(this.draft.issueNumbers);
          }
      }

      //publisher
      if (pub) title.push(publisher);
      //year
      if (year) title.push(titleYear);

      if (this.defaultProductType === "sets") {
        //default verbiage for sets
        title.push("Complete Set Run Lot");
      }

      //if FIELD issueNumbers is over 2 issues then add first and last
      if (issueNumbers.length >= 2) {
        const firstLast = `${[...issueNumbers].shift()}-${[
          ...issueNumbers
        ].pop()}`;
        title.push(firstLast);

        //if longer than 50 we need to truncate it
        if (this.draft.issueNumbers.length > 50)
          this.draft.issueNumbers = firstLast;
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

      this.handleEbayStoreCategory2(this.getPublisher());

      if (this.defaultProductType === "adult") {
        this.handleAdultDefaults();
      }

      //issue Number
      this.draft.issueNumbers = this.getFullIssueNumbers().join(" ");

      //publisher/year/date
      this.draft.publisher = this.getPublisher();

      //bring in upc from 1st issue
      this.draft.upc = this.getUpc();

      this.draft.ebaySiteCategoryId = this.getEbayCategory();

      //cover date
      const coverDate = this.getCoverDate();
      if (coverDate) {
        this.draft.publishedYear = format(coverDate, "YYYY");
        this.draft.publishedDate = format(coverDate, "MMM YYYY");
      }

      this.draft.inventoryTitle = this.createTitleWithOptions(false, false);

      this.draft.mainCharacter = this.checkMainCharacterAgainstTitle(
        this.draft.inventoryTitle
      );

      //extra descrption issues numbers:
      this.draft.extraDescription = buildExtraDescriptionIssueNumbers(
        this.issues
      );

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
      //let field = document.getElementById("searchEbaySiteCategoryId");
      //field.disabled = true;

      //let label = document.querySelectorAll('[for="searchEbaySiteCategoryId"]');
      //label[0].innerText =
      //  "Everything Else > Adult Only > Collectibles > Comics";

      //secondary store category should be auto filled
      this.draft.ebayStoreCategoryIdTwo = this.ebayStoreCategories[
        this.defaultProductType
      ];
    }
  }
};
</script>

<style scoped></style>
