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
        :ourSelectedTitle="ourSelectedTitle"
        :ourSelectedIssueIndex="ourSelectedIssueIndex"
        :ourIssuesPagination="ourIssuesPagination"
      />
    </div>
  </div>
</template>

<script>
import Datalist from "./Datalist/Datalist";

export default {
  props: {
    rowHeight: [Number],
    ourSelectedTitle: [Boolean, Object],
    ourSelectedIssueIndex: [Boolean, Number],
    ourIssuesResults: [Boolean, Array],
    ourIssuesPagination: [Boolean, Object]
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
