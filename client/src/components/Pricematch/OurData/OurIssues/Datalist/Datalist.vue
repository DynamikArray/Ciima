<template>
  <vuescroll :ops="ops" class="" id="ourIssuesScroller" ref="ourIssuesScroller">
    <div
      class="w-100 ma-1 px-1 borderBottom hover"
      v-for="item in items"
      :id="`ourIssues_${item._dataIndex}`"
      :class="isRowSelected(item)"
      @click="selectOurIssue(item)"
      v-ripple
    >
      <div class="d-flex justify-start align-center w-100">
        <div class="text-center" style="min-width:40px">
          <v-icon
            :name="`${item.TID}-${item.fullIssue}`"
            v-if="item.hasMatch"
            class=""
          >
            fas fa-link
          </v-icon>
        </div>

        <div class="text-center" style="min-width:40px">
          <Prices v-if="item.issuePrices" :prices="item.issuePrices" />
        </div>

        <div class="px-2 text-left mr-auto">
          {{ item.title }} #{{ item.fullIssue }}
        </div>
        <div class="body-2 px-2 text-right" style="min-width:40px">
          {{ item.coverDate | date }}
        </div>
        <div class="px-2 text-right" style="min-width:80px">
          {{ item.variation }}
        </div>
        <div class="px-2 text-right" style="min-width:80px">
          {{ item.comicType }}
        </div>
        <div class="px-2 text-right" style="min-width:80px">
          <h4>{{ item.fullIssue }}</h4>
        </div>
        <div class="px-3" style="min-width:30px">
          <IssueImage :item="item" :onClick="() => {}" />
        </div>
      </div>
    </div>

    <CustomPager
      name="ourHheaderPager"
      :pagination="ourIssuesPagination"
      :ourSelectedTitle="ourSelectedTitle"
      class="mb-10"
    />
  </vuescroll>
</template>

<script>
import { SET_OUR_SELECTED_ISSUE } from "@/store/action-types";
import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";

import IssueImage from "@/components/Pricematch/OurData/OurIssues/Templates/IssueImage";
import CustomPager from "@/components/Pricematch/OurData/OurIssues/Templates/CustomPager";
import Prices from "@/components/Pricematch/OurData/OurIssues/Templates/Prices";

export default {
  props: {
    ourSelectedTitle: [Boolean, Object],
    ourIssuesPagination: [Boolean, Object],
    ourSelectedIssueIndex: [Boolean, Number],
    items: [Boolean, Array],
    loading: [Boolean]
  },
  components: {
    vuescroll,
    IssueImage,
    CustomPager,
    Prices
  },
  data: () => ({
    ops: scrollbarSettings
  }),
  watch: {
    ourIssuesPagination: function(newVal, oldVal) {
      if (
        newVal.page !== oldVal.page &&
        newVal.rowsTotal !== oldVal.rowsTotal
      ) {
        this.$refs["ourIssuesScroller"].scrollIntoView(`#ourIssues_0`, 250);
      }
    },
    ourSelectedIssueIndex: function(val) {
      if (val) {
        this.$refs["ourIssuesScroller"].scrollIntoView(
          `#ourIssues_${val}`,
          250
        );
      } else {
        this.$refs["ourIssuesScroller"].scrollIntoView(`#ourIssues_0`, 250);
      }
    }
  },
  methods: {
    isRowSelected(item) {
      if (item._dataIndex == this.ourSelectedIssueIndex) {
        return "secondary lighten-2";
      }
      return "grey darken-3";
    },
    selectOurIssue(item) {
      this.$store.dispatch(
        `pricematch/ourData/${SET_OUR_SELECTED_ISSUE}`,
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
