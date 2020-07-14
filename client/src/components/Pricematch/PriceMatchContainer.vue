<template>
  <div class="d-flex flex-column" :style="getStyle">
    <v-slide-y-reverse-transition mode="in-out">
      <DataFilters
        v-if="matchType == 'ISSUES'"
        :hideVariants.sync="hideVariants"
        :hideComicTypes.sync="hideComicTypes"
      />
    </v-slide-y-reverse-transition>

    <div
      class="d-flex flex-grow-1 bottomRow"
      id="bottomRowWrapper"
      ref="bottomRowWrapper"
    >
      <div class="w-100 leftColumn">
        <OurDataContainer
          :ourSelectedTitle="ourSelectedTitle"
          :ourIssuesResults="ourIssuesResultsFiltered"
          :loading="false"
          :rowHeight="containerHeight"
          :matchType="matchType"
        />
      </div>
      <div class="w-100 rightColumn">
        <TheirDataContainer
          :ourSelectedTitle="ourSelectedTitle"
          :theirSelectedTitle="theirSelectedTitle"
          :theirIssuesResults="theirIssuesResults"
          :loading="false"
          :rowHeight="containerHeight"
          :matchType="matchType"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import OurDataContainer from "./OurData/OurDataContainer";
import TheirDataContainer from "./TheirData/TheirDataContainer";

import DataFilters from "./DataFilters/DataFilters";

export default {
  props: {
    tabNumber: [Number],
    containerHeight: [Number]
  },
  components: {
    DataFilters,
    OurDataContainer,
    TheirDataContainer
  },
  data: () => ({
    hideVariants: false,
    hideComicTypes: false
  }),
  computed: {
    ...mapState({}),
    ...mapGetters({
      ourSelectedTitle: "pricematch/getOurSelectedTitle",
      theirSelectedTitle: "pricematch/getTheirSelectedTitle",
      ourIssuesResults: "pricematch/getOurIssuesResults",
      theirIssuesResults: "pricematch/getTheirIssuesResults"
    }),
    getStyle() {
      return { height: `${this.containerHeight}px` };
    },
    matchType() {
      switch (this.tabNumber) {
        case 0:
          return "TITLES";
          break;
        case 1:
          return "ISSUES";
          break;
      }
      return false;
    },
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
    }
  }
};

/*


if(this.blnComicTypes){

}
if(this.blnVariants)

 */
</script>

<style>
.leftBorder {
  border-left: 2px solid #616161;
}

.rightBorder {
  border-right: 2px solid #616161;
}
</style>
<style scoped>
.topRow {
  flex-basis: min-content;
}
.bottomRow {
  border-top: 2px solid #616161;
}

.leftColumn {
  /*border-left: 5px solid #616161;*/
  border-right: 2px solid #616161;
}

.rightColumn {
  /*  border-right: 5px solid #616161;*/
  border-left: 2px solid #616161;
}
</style>
