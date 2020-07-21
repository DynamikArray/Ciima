<template>
  <div class="d-flex flex-column w-100 h-100 " :style="stylesObject">
    <vuescroll :ops="ops" class="" id="theirTitlesScroller">
      <div class="HideOverflowY mb-0">
        <div class="d-flex align-center justify-start ma-4">
          <TheirTitlesSearchForm :ourSelectedTitle="ourSelectedTitle" />
        </div>
        <div class="d-flex align-stretch justify-center h-100">
          <TheirTitlesDatatable class="mx-0" />
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";

import TheirTitlesSearchForm from "./SearchForm/TheirTitlesSearchForm";
import TheirTitlesDatatable from "./Datatable/TheirTitlesDatatable";
export default {
  props: {
    ourSelectedTitle: [Boolean, Object],
    rowHeight: [Number]
  },
  components: {
    vuescroll,
    TheirTitlesSearchForm,
    TheirTitlesDatatable
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
#theirTitlesScroller .__rail-is-horizontal {
  display: none;
}

.HideOverflowY {
  overflow-y: hidden;
}
</style>
