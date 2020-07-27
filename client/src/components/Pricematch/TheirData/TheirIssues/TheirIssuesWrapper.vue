<template>
  <div
    class="d-flex flex-column justify-start align-center w-100 mx-0 my-0"
    :style="stylesObject"
  >
    <CustomPager
      name="MCSheaderPager"
      :pagination="theirIssuesPagination"
      class=""
    />
    <div class="HideOverflowY mb-0 w-100">
      <LoadingScreen :loading="loading" />
      <Datalist
        class="mr-3"
        v-if="theirIssuesResults"
        :items="theirIssuesResults"
        :theirIssuesPagination="theirIssuesPagination"
        :theirSelectedIssueIndex="theirSelectedIssueIndex"
      />
    </div>
  </div>
</template>

<script>
import CustomPager from "./Templates/CustomPager";
import Datalist from "./Datalist/Datalist";
import LoadingScreen from "./Templates/LoadingScreen";

export default {
  props: {
    loading: [Boolean],
    rowHeight: [Number],
    theirSelectedIssueIndex: [Boolean, Number],
    theirIssuesResults: [Boolean, Array],
    theirIssuesPagination: [Boolean, Object]
  },
  components: {
    CustomPager,
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
#theirIssuesScroller .__rail-is-horizontal {
  display: none;
}
</style>
