<template>
  <vuescroll
    :ops="ops"
    class=""
    id="theirIssuesScroller"
    ref="theirIssuesScroller"
  >
    <div
      class="w-100 ma-1 pa-1 hover"
      v-for="item in items"
      :id="`theirIssues_${item._dataIndex}`"
      :class="isRowSelected(item)"
      @click="selectTheirIssue(item)"
      v-ripple
    >
      <div class="d-flex justify-start align-center w-100">
        <div class="px-2" style="min-width:30px">
          <IssueImage :item="item" :onClick="() => {}" />
        </div>
        <div class="px-2 text-left" style="min-width:80px">
          {{ item.issueNumber }}
        </div>
        <div class="px-2 text-left mr-auto">
          {{ item.title }}
        </div>
        <div class="px-2 mr-4">
          <Prices :item="item" />
        </div>
      </div>
    </div>
    <CustomPager
      name="MCSFooterPager"
      :pagination="theirIssuesPagination"
      class="mb-5"
    />
  </vuescroll>
</template>

<script>
import { SET_THEIR_SELECTED_ISSUE } from "@/store/action-types";

import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";

import IssueImage from "@/components/Pricematch/TheirData/TheirIssues/Templates/IssueImage";
import Prices from "@/components/Pricematch/TheirData/TheirIssues/Templates/Prices";

import CustomPager from "@/components/Pricematch/TheirData/TheirIssues/Templates/CustomPager";

export default {
  props: {
    theirIssuesPagination: [Boolean, Object],
    theirSelectedIssueIndex: [Boolean, Number],
    items: [Boolean, Array],
    loading: [Boolean]
  },
  components: {
    vuescroll,
    IssueImage,
    Prices,
    CustomPager
  },
  watch: {
    theirIssuesPagination: function(newVal, oldVal) {
      if (newVal.page !== oldVal.page) {
        this.$refs["theirIssuesScroller"].scrollIntoView(`#theirIssues_0`, 250);
      }
    },
    items: function(items) {
      if (items[0]) {
        this.$store.dispatch(
          `pricematch/theirData/${SET_THEIR_SELECTED_ISSUE}`,
          items[0],
          {
            global: true
          }
        );
      }
    },
    theirSelectedIssueIndex: function(val) {
      if (val) {
        this.$refs["theirIssuesScroller"].scrollIntoView(
          `#theirIssues_${val}`,
          250
        );
      } else {
        this.$refs["theirIssuesScroller"].scrollIntoView(`#theirIssues_0`, 250);
      }
    }
  },
  data: () => ({
    ops: scrollbarSettings
  }),
  methods: {
    isRowSelected(item) {
      if (item._dataIndex == this.theirSelectedIssueIndex) {
        return "secondary lighten-2";
      }
      return "grey darken-3";
    },
    selectTheirIssue(item) {
      this.$store.dispatch(
        `pricematch/theirData/${SET_THEIR_SELECTED_ISSUE}`,
        item,
        {
          global: true
        }
      );
    }
  }
};
</script>

<style scoped></style>
