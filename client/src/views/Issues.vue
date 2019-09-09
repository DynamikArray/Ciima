<template>
  <v-container fluid>
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex flex-column align-self-center mr-4">
        <v-btn color="primary" :to="'/titles'">
          <v-icon>fa-arrow-alt-circle-left</v-icon>
        </v-btn>
        <h5 class="text-center mt-2">
          Return to <br />
          Title Search
        </h5>
      </div>
      <div class="d-flex grow align-center">
        <SelectedTitle></SelectedTitle>
      </div>
    </div>

    <v-row no-gutters>
      <v-divider class="my-3"></v-divider>
    </v-row>
    <v-row no-gutters>
      <v-col class="text-center">
        <IssueResults></IssueResults>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import { SEARCH_ISSUES } from "@/store/action-types.js";
import SelectedTitle from "@/components/Search/Results/SelectedTitle";
import IssueResults from "@/components/Search/Results/IssueResults";

export default {
  props: {
    titleId: [Number, String]
  },
  created() {
    console.log(this.titleId);
  },
  components: {
    SelectedTitle,
    IssueResults
  },

  computed: {
    ...mapState({
      selectedTitle: state => state.titleSearch.selected.item
    })
  },

  created() {
    //no selected title so start back at input
    if (!this.selectedTitle) {
      this.$router.push({ name: "titles" });
    }

    //search for issues
    const titleId = this.titleId;
    if (titleId) {
      this.$store.dispatch(`issueSearch/${SEARCH_ISSUES}`, {
        titleId: titleId
      });
    }
  }
};
</script>

<style scoped></style>
