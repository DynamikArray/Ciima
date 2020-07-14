<template>
  <div class="mt-2">
    <v-dialog
      v-model="dialog"
      width="100%"
      overlay-color="grey darken-3"
      overlay-opacity=".95"
      elevation="10"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="info darken-1 mt-4" v-bind="attrs" v-on="on">
          <v-icon small class="mr-1">fa-stopwatch</v-icon>Speed Form
        </v-btn>
      </template>

      <v-card class="grey darken-4">
        <v-card-title class="pa-0" primary-title>
          <PrevRowWrapper
            :ourIssue="ourPrevIssue"
            :theirIssue="theirPrevIssue"
          />
        </v-card-title>
        <v-divider class="my-1"></v-divider>
        <v-card-text
          v-if="dialog"
          class="white--text"
          v-shortkey="{
            up: ['arrowup'],
            down: ['arrowdown'],
            w: ['w'],
            s: ['s']
          }"
          @shortkey="ourIssuesNavigation"
        >
          <div class="d-flex justify-center align-center w-100">
            <div class="d-flex justify-center align-center w-100">
              <OurIssue
                v-if="ourSelectedIssue"
                :selectedIssue="ourSelectedIssue"
                class="textShadow"
              />
            </div>
            <div
              class="d-flex flex-column justify-center align-self-stretch leftBorder rightBorder align-center"
            >
              <DataFilters
                class="mb-10"
                :asColumn="true"
                :hideVariants.sync="hideVariants"
                :hideComicTypes.sync="hideComicTypes"
              />

              <v-btn class="mx-4" color="success"
                ><v-icon small class="mr-1">fa fa-save</v-icon>Save Match</v-btn
              >
              <div class="caption mt-1">
                (Spacebar Key)
              </div>
            </div>
            <div class="d-flex justify-center align-center w-100">
              <TheirIssue
                v-if="theirSelectedIssue"
                :selectedIssue="theirSelectedIssue"
                class="textShadow "
              />
            </div>
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-title class="pa-0" primary-title>
          <NextRowWrapper
            :ourIssue="ourNextIssue"
            :theirIssue="theirNextIssue"
          />
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  SET_OUR_SELECTED_ISSUE,
  SET_THEIR_SELECTED_ISSUE
} from "@/store/action-types";

import OurIssue from "./OurIssue/OurIssue";
import TheirIssue from "./TheirIssue/TheirIssue";
import PrevRowWrapper from "./PrevNext/PrevRowWrapper";
import NextRowWrapper from "./PrevNext/NextRowWrapper";
import DataFilters from "../DataFilters/DataFilters";

export default {
  components: {
    OurIssue,
    TheirIssue,
    PrevRowWrapper,
    NextRowWrapper,
    DataFilters
  },
  data: () => ({
    dialog: false,
    hideVariants: false,
    hideComicTypes: false
  }),
  computed: {
    ...mapState({
      ourSelectedIssue: state => state.pricematch.ourSelectedIssue,
      theirSelectedIssue: state => state.pricematch.theirSelectedIssue,
      ourIssuesResults: state => state.pricematch.ourIssuesResults,
      theirIssuesResults: state => state.pricematch.theirIssuesResults
    }),
    ourIndexedResults() {
      return this.ourIssuesResults

        .filter(issue => {
          if (this.hideVariants) {
            if (issue.variation !== "" || issue.variation.length > 0)
              return false;
          }

          if (this.hideComicTypes) {
            if (issue.comicType.length > 0) return false;
          }

          return true;
        })
        .map((issue, i) => {
          return { ...issue, ...{ _dataIndex: i } };
        });
    },
    ourPrevIssue() {
      if (this.ourSelectedIssue)
        return (
          this.ourIndexedResults[this.ourSelectedIssue._dataIndex - 1] || false
        );
      return false;
    },
    theirPrevIssue() {
      if (this.theirSelectedIssue)
        return (
          this.theirIssuesResults.issues[
            this.theirSelectedIssue._dataIndex - 1
          ] || false
        );
      return false;
    },
    ourNextIssue() {
      if (this.ourSelectedIssue)
        return (
          this.ourIndexedResults[this.ourSelectedIssue._dataIndex + 1] || false
        );
      return false;
    },
    theirNextIssue() {
      if (this.theirSelectedIssue)
        return (
          this.theirIssuesResults.issues[
            this.theirSelectedIssue._dataIndex + 1
          ] || false
        );
      return false;
    }
  },
  methods: {
    ourIssuesNavigation(event) {
      switch (event.srcKey) {
        case "up":
          this.$store.dispatch(
            `pricematch/${SET_THEIR_SELECTED_ISSUE}`,
            this.theirPrevIssue,
            { global: true }
          );
          break;
        case "down":
          this.$store.dispatch(
            `pricematch/${SET_THEIR_SELECTED_ISSUE}`,
            this.theirNextIssue,
            { global: true }
          );
          break;
        case "w":
          this.$store.dispatch(
            `pricematch/${SET_OUR_SELECTED_ISSUE}`,
            this.ourPrevIssue,
            { global: true }
          );
          break;
        case "s":
          this.$store.dispatch(
            `pricematch/${SET_OUR_SELECTED_ISSUE}`,
            this.ourNextIssue,
            { global: true }
          );
          break;
      }
    }
  }
};
</script>

<style scoped></style>
