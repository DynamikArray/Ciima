<template>
  <v-slide-x-transition mode="out-in">
    <OurTitlesWrapper
      v-if="!ourSelectedTitle"
      :rowHeight="rowHeight"
      :matchType="matchType"
    />

    <OurIssuesWrapper
      v-if="ourSelectedTitle"
      :ourSelectedIssueIndex="ourSelectedIssueIndex"
      :ourSelectedTitle="ourSelectedTitle"
      :ourIssuesResults="ourIssuesResults"
      :ourIssuesPagination="ourIssuesPagination"
      :loading="false"
      :rowHeight="rowHeight"
      :matchType="matchType"
    />
  </v-slide-x-transition>
</template>

<script>
import OurTitlesWrapper from "./OurTitles/OurTitlesWrapper";
import OurIssuesWrapper from "./OurIssues/OurIssuesWrapper";

export default {
  props: {
    ourSelectedIssueIndex: [Boolean, Number],
    ourSelectedTitle: [Boolean, Object],
    ourIssuesResults: [Boolean, Array],
    ourIssuesPagination: [Boolean, Object],
    loading: [Boolean],
    matchType: [String],
    rowHeight: [Number]
  },
  components: {
    OurTitlesWrapper,
    OurIssuesWrapper
  }
};
</script>

<style scoped></style>
