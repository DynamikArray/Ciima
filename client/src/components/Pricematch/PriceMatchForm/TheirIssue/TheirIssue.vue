<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div
      class="d-flex justify-start align-center w-100 align-self-stretch"
      :key="
        `${selectedIssue.title}-${selectedIssue.issueNumber}-${
          selectedIssue.year
        }`
      "
    >
      <div class="d-flex mr-3">
        <IssueImage :item="selectedIssue"></IssueImage>
      </div>
      <div
        class="d-flex flex-column align-self-stretch align-start justify-center h-100 w-100"
      >
        <h4 class="my-0">
          {{ selectedIssue.title }} {{ selectedIssue.issueNumber }}
        </h4>
        <div class="d-flex flex-row justify-space-between w-100">
          <h1 class="my-0">{{ selectedIssue.issueNumber }}</h1>
          <div class="d-flex align-center justify-end w-100 mr-4">
            <h4>
              Prices:
            </h4>
          </div>
        </div>

        <div class="d-flex flex-wrap justify-end align-center w-100">
          <div
            class="d-flex flex-column align-center justify-center mx-3 mb-1"
            v-for="price in selectedIssue.prices"
          >
            <h5 class="caption">
              {{ price.grade }}
            </h5>
            <h5 class="caption">
              {{ price.price | currency }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </v-slide-x-reverse-transition>
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
