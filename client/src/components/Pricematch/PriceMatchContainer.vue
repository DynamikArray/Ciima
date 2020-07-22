<template>
  <div
    class="d-flex flex-column align-self-stretch"
    :style="getStyle"
    v-shortkey.once="{
      up: ['arrowup'],
      down: ['arrowdown'],
      w: ['w'],
      s: ['s']
    }"
    @shortkey="issuesNavigation"
  >
    <div class="d-flex bottomRow w-100">
      <div class="borderRight" style="width:50%">
        <SelectedTitle
          :blnOurs="true"
          :selectedTitle="ourSelectedTitle"
          class=" secondary darken"
        />

        <div
          class="d-flex flex-wrap justify-space-around align-center borderBottom"
        >
          <DataFilters
            ref="dataFilter"
            :borderBottom="false"
            :hideVariants.sync="hideVariants"
            :hideComicTypes.sync="hideComicTypes"
          />
          <CustomPager
            name="ourHheaderPager"
            :pagination="ourIssuesPagination"
            :ourSelectedTitle="ourSelectedTitle"
            class="justify-center align-center"
          />
        </div>

        <OurDataContainer
          class="w-100"
          :ourSelectedTitle="ourSelectedTitle"
          :ourIssuesResults="ourIndexedResults"
          :ourIssuesPagination="ourIssuesPagination"
          :ourSelectedIssueIndex="ourSelectedIssueIndex"
          :loading="false"
          :rowHeight="calculateRowHeight"
        />
      </div>
      <div class="borderLeft" style="width:50%">
        <SelectedTitle
          :blnTheirs="true"
          :selectedTitle="theirSelectedTitle"
          class="secondary darken"
        />

        <TheirDataContainer
          class="w-100"
          :ourSelectedTitle="ourSelectedTitle"
          :theirSelectedTitle="theirSelectedTitle"
          :theirSelectedIssueIndex="theirSelectedIssueIndex"
          :theirIssuesResults="theirIssuesResults"
          :theirIssuesPagination="theirIssuesPagination"
          :loading="false"
          :rowHeight="containerHeight"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  SET_OUR_SELECTED_ISSUE,
  SET_THEIR_SELECTED_ISSUE
} from "@/store/action-types";

import { mapState, mapGetters } from "vuex";
import OurDataContainer from "./OurData/OurDataContainer";
import TheirDataContainer from "./TheirData/TheirDataContainer";
import DataFilters from "./DataFilters/DataFilters";
import CustomPager from "./OurData/OurIssues/Templates/CustomPager";
import SelectedTitle from "./SelectedTitles/SelectedTitle";

export default {
  props: {
    containerHeight: [Number]
  },
  components: {
    SelectedTitle,
    DataFilters,
    OurDataContainer,
    TheirDataContainer,
    CustomPager
  },
  data: () => ({
    hideVariants: false,
    hideComicTypes: false
  }),
  computed: {
    ...mapGetters({
      ourSelectedTitle: "pricematch/getOurSelectedTitle",
      ourSelectedIssue: "pricematch/getOurSelectedIssue",
      theirSelectedTitle: "pricematch/getTheirSelectedTitle",
      theirSelectedIssue: "pricematch/getTheirSelectedIssue",
      ourIssuesResults: "pricematch/getOurIssuesResults",
      ourIssuesPagination: "pricematch/getOurIssuesPagination",
      theirIssuesResults: "pricematch/getTheirIssuesResults",
      theirIssuesPagination: "pricematch/getTheirIssuesPagination"
    }),
    calculateRowHeight() {
      if (this.$refs["dataFilter"]) {
        return this.containerHeight - this.$refs["dataFilter"].$el.clientHeight;
      }
      return this.containerHeight;
    },
    getStyle() {
      return { height: `${this.containerHeight}px` };
    },

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
          //return this.theirIssuesResults[[tSI._dataIndex]];
        }
      }
      return this.theirIssuesResults[tSI._dataIndex - 1];
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
        if (tNI._dataIndex + 1 >= this.theirIssuesResults.length) {
          return false;
          //return this.theirIssuesResults[[tNI._dataIndex]];
        }
      }
      return this.theirIssuesResults[tNI._dataIndex + 1];
    }
    /*
    ourIssuesResultsFiltered() {
      const filtered = this.ourIssuesResults;
      return this.ourIssuesResults
        .map((issue, i) => {
          return { _dataIndex: i, ...issue };
        })
        .filter(issue => {
          if (this.hideVariants) {
            if (issue.variation !== "" || issue.variation.length > 0)
              return false;
          }

          if (this.hideComicTypes) {
            if (issue.comicType.length > 0) return false;
          }

          return true;
        });
    }*/
  },
  methods: {
    issuesNavigation(event) {
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
