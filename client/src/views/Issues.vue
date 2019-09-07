<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col>
        <SelectedTitle></SelectedTitle>
      </v-col>
    </v-row>
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
      this.$router.push({ name: "input" });
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
