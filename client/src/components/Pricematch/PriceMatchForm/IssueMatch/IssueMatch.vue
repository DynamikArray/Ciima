<template>
  <v-dialog
    v-model="dialog"
    overlay-color="grey darken-2"
    overlay-opacity=".75"
    width="50%"
    elevation="10"
  >
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex align-end justify-end mx-3" v-if="issue.hasMatch">
        <div class="d-flex flex-column align-center justify-center">
          <h5>Matched:</h5>
          <h4 class="mt-1">
            <v-btn
              color="secondary"
              v-bind="attrs"
              v-on="on"
              @click="fetchCurrentIssueMatch"
            >
              <v-icon color="green" small class="mr-1">fa fa-link</v-icon>View
            </v-btn>
          </h4>
        </div>
      </div>
    </template>

    <IssueCard
      v-if="issue.hasMatch"
      :selectedRecord="selectedRecord"
    ></IssueCard>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_PRICELIST_RECORD } from "@/store/action-types";

import IssueCard from "./IssueCard";
export default {
  props: {
    issue: [Boolean, Object]
  },
  components: {
    IssueCard
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapGetters({
      selectedRecord: "pricelist/getSelectedRecord"
    })
  },
  methods: {
    fetchCurrentIssueMatch() {
      if (this.issue) {
        const issueId = this.issue.id;
        this.$store.dispatch(`pricelist/${GET_PRICELIST_RECORD}`, issueId);
      }
    }
  }
};
</script>

<style scoped></style>
