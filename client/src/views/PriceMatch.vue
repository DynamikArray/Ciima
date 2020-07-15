<template>
  <v-container fluid class="pa-0 ma-0 fullContainer" id="fullContainer">
    <div
      id="pageHeading"
      class="d-flex justify-start align-baseline pa-0 mx-2 mt-1"
    >
      <h1 class="mr-2 mb-0">
        <i class="fa fa-project-diagram mr-1"></i>Price Match
      </h1>
      <h4 class="mb-0">Match Our Titles With MyComicShop Titles</h4>
    </div>

    <div
      class="grey darken-3 pa-4"
      id="pageTabsWrapper"
      v-resize:debounce="onResize"
    >
      <v-tabs v-model="tab" color="info" vertical class="grey darken-4">
        <v-tab class="grey darken-4">
          <v-icon class="mx-2">fa fa-list-alt</v-icon>Titles
          <v-icon v-if="tab == 0" class="mx-2">fa fa-caret-left</v-icon>
        </v-tab>
        <v-tab class="grey darken-4">
          <v-icon class="mx-2">fa fa-portrait</v-icon>Issues
          <v-icon v-if="tab == 1" class="mx-2">fa fa-caret-left</v-icon>
        </v-tab>
        <v-tab-item key="tabTitleMatch" class="grey darken-4 h-100">
          <SaveTitleMatchForm
            :ourSelectedTitle="ourSelectedTitle"
            :theirSelectedTitle="theirSelectedTitle"
          />
        </v-tab-item>
        <v-tab-item key="tabIssueMatch" class="grey darken-4 h-100">
          <SaveIssueMatchForm
            :ourSelectedIssue="ourSelectedIssue"
            :theirSelectedIssue="theirSelectedIssue"
          />
        </v-tab-item>
      </v-tabs>
    </div>

    <v-divider class="my-0"></v-divider>

    <div id="pricematchContentWrapper" class="">
      <PriceMatchContainer
        :containerHeight="containerHeight"
        :tabNumber="Number(tab)"
      />
    </div>
  </v-container>
</template>

<script>
import resize from "vue-resize-directive";

import { mapState, mapGetters } from "vuex";
import PriceMatchContainer from "@/components/Pricematch/PriceMatchContainer";
import SaveTitleMatchForm from "@/components/Pricematch/SaveTitleMatchForm/SaveTitleMatchForm";
import SaveIssueMatchForm from "@/components/Pricematch/SaveIssueMatchForm/SaveIssueMatchForm";

export default {
  components: {
    SaveTitleMatchForm,
    SaveIssueMatchForm,
    PriceMatchContainer
  },
  data: () => ({
    tab: 0,
    containerHeight: 0
  }),
  directives: {
    resize
  },
  mounted() {
    this.setContainerSize(true);
  },
  watch: {
    tab: function(oldVal, newVal) {
      this.setContainerSize();
    }
  },
  computed: {
    ...mapGetters({
      ourSelectedTitle: "pricematch/getOurSelectedTitle",
      theirSelectedTitle: "pricematch/getTheirSelectedTitle",
      //
      ourIssuesResults: "pricematch/getOurIssuesResults",
      //
      ourSelectedIssue: "pricematch/getOurSelectedIssue",
      theirSelectedIssue: "pricematch/getTheirSelectedIssue"
    })
  },
  methods: {
    onResize(val) {
      this.setContainerSize();
    },
    setContainerSize(blnFirst) {
      const headingHeight = document.getElementById("pageHeading").clientHeight;
      const tabsHeight = document.getElementById("pageTabsWrapper")
        .clientHeight;
      const containerHeight = document.getElementById("fullContainer")
        .clientHeight;

      const maxHeight = containerHeight - headingHeight - tabsHeight - 6;
      this.containerHeight = maxHeight;

      document
        .getElementById("pricematchContentWrapper")
        .setAttribute("style", `height: ${maxHeight}px`);
    }
  }
};
</script>

<style>
#fullContainer .v-window__container {
  height: 100%;
}
.borderMe {
  border: 2px solid #616161;
}
</style>
<style scoped>
.fullContainer {
  min-height: calc(100%);
  height: calc(100%) !important;
  max-height: calc(100%) !important;
}
</style>
