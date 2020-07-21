<template>
  <div class="d-flex justify-center align-center w-100">
    <div class="d-flex justify-center align-center w-100 borderRight">
      <div class="w-100" style="height: 295px">
        <vuescroll :ops="ops" class="" id="ourIssuesScroller">
          <div class="HideOverflowY mb-0">
            <OurIssuesDatatable
              :ourIssues="ourIssues"
              :ourSelectedIssueIndex="ourSelectedIssueIndex"
            />
          </div>
        </vuescroll>
      </div>
    </div>
    <div class="d-flex justify-center align-center w-100 borderLeft">
      <div class="w-100" style="height: 295px">
        <vuescroll :ops="ops" class="pr-3" id="theirIssuesScroller">
          <div class="HideOverflowY mb-0">
            <TheirIssuesDatatable
              class="pb-5"
              :theirIssues="theirIssues"
              :theirIssuesPagination="theirIssuesPagination"
              :theirSelectedIssueIndex="theirSelectedIssueIndex"
            />
          </div>
        </vuescroll>
      </div>
    </div>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";
import OurIssuesDatatable from "./OurIssues/OurIssuesDatatable";

import TheirIssuesDatatable from "./TheirIssues/TheirIssuesDatatable";
import MCSPager from "../../TheirData/TheirIssues/Datatable/Templates/MCSPager/MCSPager";

export default {
  props: {
    containerHeight: [Boolean, Number],
    ourIssues: [Boolean, Array],
    ourSelectedIssueIndex: [Boolean, Number],
    theirIssues: [Boolean, Array, Object],
    theirIssuesPagination: [Boolean, Object],
    theirSelectedIssueIndex: [Boolean, Number]
  },
  components: {
    vuescroll,
    OurIssuesDatatable,
    TheirIssuesDatatable,
    MCSPager
  },
  data: () => ({
    ops: scrollbarSettings
  }),
  mounted() {
    return { height: `${this.containerHeight - 5}px` };
  },
  computed: {
    getStyles() {
      return { height: `${this.containerHeight}px` };
    }
  }
};
</script>

<style></style>
