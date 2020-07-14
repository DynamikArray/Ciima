<template>
  <v-slide-y-reverse-transition mode="out-in">
    <div class="d-flex justify-end align-center w-100" :key="selectedIssue.id">
      <div class="d-flex flex-column align-center justify-start h-100 w-100 ">
        <div class="d-flex justify-center align-center">
          <h1 class="my-2 text-center">
            {{ selectedIssue.title }} #{{ selectedIssue.fullIssue }}
          </h1>
        </div>

        <div class="d-flex flex-row justify-center align-center">
          <div class="d-flex align-stretch justify-center">
            <div
              v-if="selectedIssue.variation"
              class="d-flex flex-column justify-center align-center"
            >
              <h2 class="mr-3">Variation:</h2>
              <h1 class="display-3 text-center my-2">
                {{ selectedIssue.variation }}
              </h1>
            </div>
            <div
              v-if="selectedIssue.comicType"
              class="d-flex flex-column justify-center align-center"
            >
              <h1 class="my-2">Type:</h1>
              <h1 class="display-3 text-center">
                {{ selectedIssue.comicType }}
              </h1>
            </div>
          </div>
          <IssueImage :item="selectedIssue"></IssueImage>
          <div class="d-flex flex-column align-center justify-center">
            <h2 class=" my-2 mx-10">
              Issue:
            </h2>
            <h1 class="display-3 my-2 mx-10">
              {{ selectedIssue.issueNumber }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </v-slide-y-reverse-transition>
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
