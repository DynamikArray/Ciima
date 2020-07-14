<template>
  <div class="d-flex flex-column w-100 h-100" :style="stylesObject">
    <vuescroll :ops="ops" class="">
      <div class="HideOverflowY mb-0">
        <div class="d-flex align-center justify-start ma-4">
          <OurTitlesSearchForm />
        </div>
        <div class="d-flex align-stretch justify-center h-100">
          <OurTitlesDatatable class="mx-3" :matchType="matchType" />
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";

import OurTitlesSearchForm from "./SearchForm/OurTitlesSearchForm";
import OurTitlesDatatable from "./Datatable/OurTitlesDatatable";
export default {
  props: {
    matchType: [String],
    rowHeight: [Number]
  },
  components: {
    vuescroll,
    OurTitlesSearchForm,
    OurTitlesDatatable
  },
  data: () => ({
    ops: scrollbarSettings,
    footerProps: {
      "items-per-page-options": [15, 30, 50, 100, 250]
    }
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

<style scoped>
.HideOverflowY {
  overflow-y: hidden;
}
</style>
