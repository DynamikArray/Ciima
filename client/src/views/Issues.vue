<template>
  <v-container fluid>
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex align-center w-100">
        <SelectedTitle :filterString="filterString"></SelectedTitle>
      </div>
    </div>

    <v-row no-gutters>
      <v-divider class="my-3"></v-divider>
    </v-row>
    <v-row no-gutters>
      <v-col class="text-center">
        <IssueResults
          :upcString.sync="upcString"
          :filterString.sync="filterString"
        ></IssueResults>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import { SEARCH_ISSUES } from "@/store/action-types.js";
import SelectedTitle from "@/components/Search/Results/SelectedTitle";
import IssueResults from "@/components/Search/Results/Issues/IssueResults";

export default {
  components: {
    SelectedTitle,
    IssueResults
  },
  computed: {
    ...mapState({
      selectedTitle: state => state.titleSearch.selected.item
    })
  },
  data() {
    return {
      filterString: "",
      upcString: false
    };
  },
  created() {
    //no selected title so start back at input
    if (!this.selectedTitle) {
      this.$router.push({ name: "titles" });
    } else {
      //search for issues
      const title = (this.selectedTitle || {}).title;

      if (title) {
        this.$store.dispatch(`issueSearch/${SEARCH_ISSUES}`, {
          title
        });
      }
    }
  }
};
</script>

<style scoped></style>
