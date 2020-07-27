<template>
  <div
    class="d-flex flex-column justify-start align-center w-100 mx-0 my-0"
    :style="stylesObject"
  >
    <div class="HideOverflowY mb-0 w-100">
      <LoadingScreen :loading="loading" />
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
import LoadingScreen from "./Templates/LoadingScreen";

export default {
  props: {
    loading: [Boolean],
    rowHeight: [Number],
    ourSelectedTitle: [Boolean, Object],
    ourSelectedIssueIndex: [Boolean, Number],
    ourIssuesResults: [Boolean, Array],
    ourIssuesPagination: [Boolean, Object]
  },
  components: {
    Datalist,
    LoadingScreen
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
