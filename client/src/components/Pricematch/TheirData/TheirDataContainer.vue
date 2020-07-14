<template>
  <v-slide-x-reverse-transition mode="out-in">
    <TheirTitlesWrapper
      v-if="!theirSelectedTitle"
      :ourSelectedTitle="ourSelectedTitle"
      :rowHeight="rowHeight"
      :matchType="matchType"
    />

    <TheirIssuesWrapper
      v-if="theirSelectedTitle && theirIssuesResults"
      :theirSelectedTitle="theirSelectedTitle"
      :theirIssuesResults="theirIssuesResults"
      :loading="false"
      :rowHeight="rowHeight"
      :matchType="matchType"
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
    theirIssuesResults: [Boolean, Array],
    loading: [Boolean],
    rowHeight: [Number],
    matchType: [String]
  },
  components: {
    TheirTitlesWrapper,
    TheirIssuesWrapper
  }
};
</script>

<style scoped></style>
