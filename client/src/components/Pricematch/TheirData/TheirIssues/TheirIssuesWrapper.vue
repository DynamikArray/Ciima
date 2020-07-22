<template>
  <div
    class="d-flex flex-column justify-start align-center w-100 mx-0 my-0"
    :style="stylesObject"
  >
    <CustomPager
      name="MCSheaderPager"
      :pagination="theirIssuesPagination"
      class="borderBottom"
    />
    <div class="HideOverflowY mb-0 w-100">
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

export default {
  props: {
    rowHeight: [Number],
    theirSelectedIssueIndex: [Boolean, Number],
    theirIssuesResults: [Boolean, Array],
    theirIssuesPagination: [Boolean, Object]
  },
  components: {
    CustomPager,
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
#theirIssuesScroller .__rail-is-horizontal {
  display: none;
}
</style>
