<template>
  <div
    class="d-flex flex-column justify-start align-center w-100 mx-0 my-0"
    :style="stylesObject"
  >
    <div class="HideOverflowY mb-0 w-100">
      <Datalist
        class="mr-3"
        v-if="ourIssuesResults"
        :items="ourIssuesResults"
        :containerHeight="rowHeight"
        :ourSelectedIssueIndex="ourSelectedIssueIndex"
      />
    </div>
  </div>
</template>

<script>
import Datalist from "./Datalist/Datalist";

export default {
  props: {
    rowHeight: [Number],
    ourSelectedIssueIndex: [Boolean, Number],
    ourIssuesResults: [Boolean, Array]
  },
  components: {
    Datalist
  },
  computed: {
    stylesObject() {
      return {
        height: `${this.rowHeight}px`
      };
    }
  },
  methods: {}
};
</script>

<style>
#ourIssuesScroller .__rail-is-horizontal {
  display: none;
}
</style>
