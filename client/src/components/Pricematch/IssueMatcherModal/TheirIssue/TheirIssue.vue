<template>
  <v-slide-y-reverse-transition mode="out-in">
    <div
      class="d-flex justify-start align-start w-100 "
      :key="
        `${selectedIssue.title}-${selectedIssue.issueNumber}-${
          selectedIssue.year
        }`
      "
    >
      <div class="d-flex flex-column align-center justify-start h-100 w-100">
        <h1 class="my-2 text-center">
          {{ selectedIssue.title }} {{ selectedIssue.issueNumber }}
        </h1>

        <div class="d-flex flex-row justify-space-around mr-3">
          <div class="d-flex flex-column align-center justify-center">
            <h2 class=" my-2 mx-10">
              Issue:
            </h2>
            <h1 class="display-3 my-2 mx-10">
              {{ selectedIssue.issueNumber.replace("#", "") }}
            </h1>
          </div>
          <IssueImage :item="selectedIssue"></IssueImage>
          <div class="d-flex align-stretch justify-center">
            <div
              class="d-flex flex-column justify-center align-center mx-3 h-100"
            >
              <h2 class="my-2">Prices:</h2>
              <div class="mt-1 mb-4 d-flex flex-column align-center ">
                <div
                  class="d-flex mx-3 mt-1 flex-wrap align-center justify-center"
                  v-for="price in top3Prices"
                >
                  <h5 class="mx-1 text-center">
                    {{ price.grade }}
                  </h5>
                  <h5 class="mx-1 text-center">
                    {{ price.price | currency }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  },
  computed: {
    top3Prices() {
      if (this.selectedIssue.prices.length > 2) {
        return this.selectedIssue.prices.slice(0, 2);
      }
      return this.selectedIssue.prices;
    }
  }
};
</script>

<style scoped></style>
