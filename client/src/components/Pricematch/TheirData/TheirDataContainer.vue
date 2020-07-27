<template>
  <v-slide-x-reverse-transition mode="out-in">
    <TheirTitlesWrapper
      v-if="!theirSelectedTitle"
      :ourSelectedTitle="ourSelectedTitle"
      :rowHeight="rowHeight"
    />

    <TheirIssuesWrapper
      v-if="theirSelectedTitle && theirIssuesResults"
      :theirSelectedIssueIndex="theirSelectedIssueIndex"
      :theirIssuesResults="theirIssuesResults"
      :theirIssuesPagination="theirIssuesPagination"
      :loading="loading"
      :rowHeight="rowHeight"
    />
  </v-slide-x-reverse-transition>
</template>

<script>
import TheirTitlesWrapper from "./TheirTitles/TheirTitlesWrapper";
import TheirIssuesWrapper from "./TheirIssues/TheirIssuesWrapper";

export default {
  props: {
    ourSelectedTitle: [Boolean, Object],
    theirSelectedTitle: [Boolean, Object],
    theirSelectedIssueIndex: [Boolean, Number],
    theirIssuesResults: [Boolean, Array],
    theirIssuesPagination: [Boolean, Object],
    loading: [Boolean],
    rowHeight: [Number]
  },
  components: {
    TheirTitlesWrapper,
    TheirIssuesWrapper
  }
};
</script>

<style scoped></style>
