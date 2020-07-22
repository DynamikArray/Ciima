<template>
  <div class="mt-2">
    <v-dialog
      v-model="dialog"
      width="100%"
      overlay-color="grey darken-3"
      overlay-opacity=".85"
      elevation="10"
      fullscreen
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="info darken-1 mt-4" v-bind="attrs" v-on="on">
          <v-icon small class="mr-1">fa-stopwatch</v-icon>Speed Form
        </v-btn>
      </template>

      <v-card class="grey darken-4" id="issueMatcherCardWrapper">
        <v-card-title
          class="pa-0"
          primary-title
          style="min-height: 80px"
          id="prevRowWrapper"
        >
          <PrevRowWrapper
            :ourIssue="ourPrevIssue"
            :theirIssue="theirPrevIssue"
          />
        </v-card-title>

        <v-divider class="my-1"></v-divider>

        <v-card-text
          id="selectedIssuesWrapper"
          v-if="dialog"
          class="white--text pa-0"
          v-shortkey="{
            up: ['arrowup'],
            down: ['arrowdown'],
            w: ['w'],
            s: ['s']
          }"
          @shortkey="ourIssuesNavigation"
        >
          <div class="d-flex justify-space-around align-center w-100">
            <div
              class="d-flex justify-center align-center w-100"
              style="min-height: 420px"
            >
              <OurIssue
                v-if="ourSelectedIssue"
                :selectedIssue="ourSelectedIssue"
                class="textShadow"
              />
            </div>

            <div
              class="d-flex justify-center align-center w-100"
              style="min-height: 420px"
            >
              <TheirIssue
                v-if="theirSelectedIssue"
                :selectedIssue="theirSelectedIssue"
                class="textShadow "
              />
            </div>
          </div>

          <v-divider></v-divider>

          <div class="w-100 secondary darken-2 pa-3">
            <div class="d-flex flex-row justify-space-between align-center">
              <DataFilters
                id="dataFilterWrapper"
                class="w-100"
                :borderBottom="false"
                :hideVariants.sync="hideVariants"
                :hideComicTypes.sync="hideComicTypes"
              />
              <div class="d-flex flex-column">
                <div class="d-flex align-center justify-center"></div>
                <div class="d-flex align-center justify-center">
                  <v-btn class="py-2" color="success"
                    ><v-icon small class="mr-1">fa fa-save</v-icon>
                    <div class="d-flex flex-column">
                      <div class="mt-0">
                        Save Match
                      </div>
                      <div class="caption mt-0">
                        (ctrl+enter)
                      </div>
                    </div>
                  </v-btn>
                </div>
              </div>
              <div class="d-flex align-center w-100">
                &nbsp;
              </div>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title class="pa-0" primary-title style="min-height: 80px">
          <NextRowWrapper
            id="nextRowWrapper"
            :ourIssue="ourNextIssue"
            :theirIssue="theirNextIssue"
          />
        </v-card-title>
        <v-card-text class="pa-0 borderTop" id="issuesListWrapper">
          <IssuesLists
            :containerHeight="containerHeight"
            :ourIssues="ourIndexedResults"
            :theirIssues="theirIssuesResults"
            :theirSelectedIssueIndex="theirSelectedIssueIndex"
            :theirIssuesPagination="theirIssuesPagination"
            :ourSelectedIssueIndex="ourSelectedIssueIndex"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import {
  SET_OUR_SELECTED_ISSUE,
  SET_THEIR_SELECTED_ISSUE
} from "@/store/action-types";

import OurIssue from "./OurIssue/OurIssue";
import TheirIssue from "./TheirIssue/TheirIssue";
import PrevRowWrapper from "./PrevNext/PrevRowWrapper";
import NextRowWrapper from "./PrevNext/NextRowWrapper";
import DataFilters from "../DataFilters/DataFilters";
import IssuesLists from "./IssuesLists/IssuesLists";

export default {
  components: {
    OurIssue,
    TheirIssue,
    PrevRowWrapper,
    NextRowWrapper,
    DataFilters,
    IssuesLists
  },
  data: () => ({
    dialog: false,
    hideVariants: false,
    hideComicTypes: false,
    containerHeight: false
  }),
  /*
  watch: {
    dialog: function(val) {
      if (val) {
        this.$nextTick(() => {
          this.setContainerSize();
        });
      }
    }
  },*/
  computed: {
    ...mapState({
      ourSelectedIssue: state => state.pricematch.ourSelectedIssue,
      theirSelectedIssue: state => state.pricematch.theirSelectedIssue,
      ourIssuesResults: state => state.pricematch.ourIssuesResults,
      theirIssuesResults: state => state.pricematch.theirIssuesResults
    }),
    ...mapGetters({
      theirIssuesPagination: "pricematch/getTheirIssuesPagination"
    }),
    theirSelectedIssueIndex() {
      if (this.theirSelectedIssue)
        return this.theirSelectedIssue._dataIndex || false;
      return false;
    },
    ourSelectedIssueIndex() {
      if (this.ourSelectedIssue)
        return this.ourSelectedIssue._dataIndex || false;
      return false;
    },
    ourIndexedResults() {
      return this.ourIssuesResults.rows
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
      if (!this.ourSelectedIssue) return false;
      const oSI = this.ourSelectedIssue || 0;
      if (oSI) {
        if (oSI._dataIndex - 1 < 0) {
          return false;
          //return this.ourIndexedResults[[oSI._dataIndex]];
        }
      }
      return this.ourIndexedResults[oSI._dataIndex - 1];
    },
    theirPrevIssue() {
      if (!this.theirSelectedIssue) return false;

      const tSI = this.theirSelectedIssue || 0;
      if (tSI) {
        if (tSI._dataIndex - 1 < 0) {
          return false;
          //return this.theirIssuesResults.issues[[tSI._dataIndex]];
        }
      }
      return this.theirIssuesResults.issues[tSI._dataIndex - 1];
    },

    ourNextIssue() {
      if (!this.ourSelectedIssue) return false;
      const oNI = this.ourSelectedIssue || 0;
      if (oNI) {
        if (oNI._dataIndex + 1 < 0) {
          return false;
          //return this.ourIndexedResults[[oNI._dataIndex]];
        }
      }
      return this.ourIndexedResults[oNI._dataIndex + 1];
    },

    theirNextIssue() {
      if (!this.theirSelectedIssue) return false;
      const tNI = this.theirSelectedIssue || 0;
      if (tNI) {
        if (tNI._dataIndex + 1 >= this.theirIssuesResults.issues.length) {
          return false;
          //return this.theirIssuesResults.issues[[tNI._dataIndex]];
        }
      }
      return this.theirIssuesResults.issues[tNI._dataIndex + 1];
    }
  },
  methods: {
    setContainerSize() {
      const modalHeight = document.getElementById("issueMatcherCardWrapper")
        .clientHeight;
      const prevRowWrapper = document.getElementById("prevRowWrapper")
        .clientHeight;
      const nextRowWrapper = document.getElementById("nextRowWrapper")
        .clientHeight;
      const dataFilterWrapper = document.getElementById("dataFilterWrapper")
        .clientHeight;
      const selectedIssuesWrapper = document.getElementById(
        "selectedIssuesWrapper"
      ).clientHeight;

      const maxHeight =
        modalHeight -
        prevRowWrapper -
        selectedIssuesWrapper -
        dataFilterWrapper -
        nextRowWrapper;

      console.log(
        "modal:",
        modalHeight,
        "selectedIssuesWrapper:",
        selectedIssuesWrapper,
        " prevRowWrapper ",
        prevRowWrapper,
        "nextRowWrapper ",
        nextRowWrapper,
        "maxHeight",
        maxHeight
      );

      this.containerHeight = maxHeight;
    },
    ourIssuesNavigation(event) {
      switch (event.srcKey) {
        case "up":
          if (this.theirPrevIssue) {
            this.$store.dispatch(
              `pricematch/${SET_THEIR_SELECTED_ISSUE}`,
              this.theirPrevIssue,
              { global: true }
            );
          }
          break;
        case "down":
          if (this.theirNextIssue) {
            this.$store.dispatch(
              `pricematch/${SET_THEIR_SELECTED_ISSUE}`,
              this.theirNextIssue,
              { global: true }
            );
          }
          break;
        case "w":
          if (this.ourPrevIssue) {
            this.$store.dispatch(
              `pricematch/${SET_OUR_SELECTED_ISSUE}`,
              this.ourPrevIssue,
              { global: true }
            );
          }
          break;
        case "s":
          if (this.ourNextIssue) {
            this.$store.dispatch(
              `pricematch/${SET_OUR_SELECTED_ISSUE}`,
              this.ourNextIssue,
              { global: true }
            );
          }
          break;
      }
    }
  }
};
</script>

<style scoped></style>
