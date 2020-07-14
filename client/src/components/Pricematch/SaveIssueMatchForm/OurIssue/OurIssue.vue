<template>
  <v-slide-y-reverse-transition mode="out-in">
    <div class="d-flex justify-end align-center w-100" :key="selectedIssue.id">
      <div class="d-flex flex-column align-end justify-start h-100 w-100">
        <h2 class="my-0">{{ selectedIssue.title }}</h2>
        <h1 class="my-0"># {{ selectedIssue.fullIssue }}</h1>

        <div class="d-flex flex-row justify-end align-baseline">
          <h6 class="caption mr-3">Issue #:</h6>
          <h4>{{ selectedIssue.issueNumber }}</h4>
        </div>

        <div
          v-if="selectedIssue.variation"
          class="d-flex flex-row justify-end align-baseline"
        >
          <h6 class="caption mr-3">Variation:</h6>
          <h4>{{ selectedIssue.variation }}</h4>
        </div>
        <div
          v-if="selectedIssue.comicType"
          class="d-flex flex-row justify-end align-baseline"
        >
          <h6 class="caption mr-3">Type:</h6>
          <h4>{{ selectedIssue.comicType }}</h4>
        </div>
      </div>

      <div class="d-flex ml-3">
        <IssueImage :item="selectedIssue"></IssueImage>
      </div>
    </div>
  </v-slide-y-reverse-transition>
</template>

<script>
import IssueImage from "./IssueImage";
export default {
  props: {
    selectedIssue: [Boolean, Object]
  },
  components: {
    IssueImage
  }
};
</script>

<style scoped></style>
