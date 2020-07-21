<template>
  <div
    class="d-flex flex-column justify-start align-center w-100 mx-0 my-0"
    :style="stylesObject"
  >
    <vuescroll :ops="ops" class="" id="ourIssuesScroller">
      <div class="HideOverflowY mb-0">
        <div class="d-flex flex-row justify-start align-center w-100">
          <OurIssuesDatatable
            class="mr-3"
            :items="ourIssuesResults"
            :containerHeight="rowHeight"
            :matchType="matchType"
          />
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";

import OurIssuesDatatable from "./Datatable/OurIssuesDatatable";
export default {
  props: {
    matchType: [String],
    rowHeight: [Number],
    ourSelectedTitle: [Boolean, Object],
    ourIssuesResults: [Boolean, Array]
  },
  components: {
    vuescroll,
    OurIssuesDatatable
  },
  data: () => ({
    ops: scrollbarSettings
  }),
  computed: {
    stylesObject() {
      return {
        height: `${this.rowHeight}px`
      };
    }
  }
};
</script>

<style>
#ourIssuesScroller .__rail-is-horizontal {
  display: none;
}
</style>
