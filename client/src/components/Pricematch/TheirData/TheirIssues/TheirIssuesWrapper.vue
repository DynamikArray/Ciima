<template>
  <div
    class="d-flex flex-column justify-start align-center w-100 mx-0 my-0"
    :style="stylesObject"
  >
    <vuescroll :ops="ops" class="ml-0 mr-0">
      <div
        class="HideOverflowY mb-0"
        :class="theirIssuesResults.length > 0 ? 'mr-4' : 'mr-0'"
      >
        <div class="d-flex flex-row justify-start align-center w-100">
          <TheirIssuesDatatable
            v-if="theirIssuesResults"
            :items="theirIssuesResults"
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

import TheirIssuesDatatable from "./Datatable/TheirIssuesDatatable";

export default {
  props: {
    matchType: [String],
    rowHeight: [Number],
    theirSelectedTitle: [Boolean, Object],
    theirIssuesResults: [Boolean, Array]
  },
  components: {
    vuescroll,
    TheirIssuesDatatable
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

<style scoped></style>
