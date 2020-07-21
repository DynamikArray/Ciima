<template>
  <div class="d-flex justify-end align-center w-100" :key="selectedIssue.id">
    <div class="d-flex flex-column align-end justify-start h-100 w-100 mr-5 ">
      <div
        class="d-flex align-self-center flex-wrap justify-center align-center"
      >
        <h1 class="my-2 text-left">
          {{ selectedIssue.title }} #{{ selectedIssue.fullIssue }}
        </h1>
      </div>

      <div
        class="d-flex flex-row align-self-stretch flex-wrap justify-space-around align-center"
      >
        <div class="d-flex align-stretch justify-center">
          <div
            v-if="selectedIssue.variation"
            class="d-flex flex-column justify-start align-center mx-2"
          >
            <h2 class="my-2">Variation:</h2>
            <h1 class="display-1 text-center">
              {{ selectedIssue.variation }}
            </h1>
          </div>
          <div
            v-if="selectedIssue.comicType"
            class="d-flex flex-column justify-start align-center mx-2"
          >
            <h2 class="my-2">Type:</h2>
            <h1 class="display-1 text-center">
              {{ selectedIssue.comicType }}
            </h1>
          </div>
          <div
            v-if="selectedIssue.issueNumber"
            class="d-flex flex-column justify-start align-center mx-2"
          >
            <h2 class="my-2">Issue:</h2>
            <h1 class="display-1 text-center">
              {{ selectedIssue.issueNumber }}
            </h1>
          </div>
          <div
            v-if="selectedIssue.fullIssue"
            class="d-flex flex-column justify-start align-center mx-2"
          >
            <h2 class="my-2">Full Issue:</h2>
            <h1 class="display-1 text-center">
              {{ selectedIssue.fullIssue }}
            </h1>
          </div>
        </div>

        <IssueImage :item="selectedIssue"></IssueImage>
      </div>
    </div>
  </div>
</template>

<script>
/*

<div>
  <h2 class=" my-2 mx-10">
    Issue: #
  </h2>
  <h1 class="display-3 my-2 mx-10">
    {{ selectedIssue.fullIssue }}
  </h1>
</div>


 */

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
