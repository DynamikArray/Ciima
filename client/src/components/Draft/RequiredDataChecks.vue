<template>
  <section v-if="!hasTitles || !hasIssues || !hasCoverPhoto">
    <div class="d-flex justify-space-around my-3">
      <!--TITLE SELECTED-->
      <div class="d-flex align-center justify-start">
        <div
          class="d-flex align-center flex-col justify-start success pa-2"
          v-if="hasTitles"
        >
          <div class="d-flex align-center  mr-3">
            <v-icon>fa-check-circle</v-icon>
          </div>
          <div class="d-flex align-center">
            <h3>Title(s) Selected</h3>
          </div>
        </div>

        <div
          class="d-flex align-center flex-col justify-start red pa-2"
          v-if="!hasTitles"
        >
          <div class="d-flex align-center  mr-3 ">
            <v-icon>fa-times-circle</v-icon>
          </div>
          <div class="d-flex align-center">
            <h3>No Titles Selected</h3>
          </div>
        </div>
      </div>
      <!--END TITLE SELECTED-->

      <!--ISSUES SELECTED-->
      <div class="d-flex align-center justify-start">
        <div
          class="d-flex align-center flex-col justify-start success pa-2"
          v-if="hasIssues"
        >
          <div class="d-flex align-center  mr-3">
            <v-icon>fa-check-circle</v-icon>
          </div>
          <div class="d-flex align-center">
            <h3>Issues Selected</h3>
          </div>
        </div>

        <div
          class="d-flex align-center flex-col justify-start red pa-2"
          v-if="!hasIssues"
        >
          <div class="d-flex align-center  mr-3 ">
            <v-icon>fa-times-circle</v-icon>
          </div>
          <div class="d-flex align-center">
            <h3>No Issues Selected</h3>
          </div>
        </div>
      </div>
      <!--END ISSUES SELECTED-->

      <!--COVER PHOTO SELECTED-->
      <div class="d-flex align-center justify-start">
        <div
          class="d-flex align-center flex-col justify-start success pa-2"
          v-if="hasCoverPhoto"
        >
          <div class="d-flex align-center  mr-3">
            <v-icon>fa-check-circle</v-icon>
          </div>
          <div class="d-flex align-center">
            <h3>Cover Photo Selected</h3>
          </div>
        </div>

        <div
          class="d-flex align-center flex-col justify-start red pa-2"
          v-if="!hasCoverPhoto"
        >
          <div class="d-flex align-center  mr-3 ">
            <v-icon>fa-times-circle</v-icon>
          </div>
          <div class="d-flex align-center">
            <h3>No Cover Photo Selected</h3>
          </div>
        </div>
      </div>
      <!--END COVER PHOTO SELECTED-->
    </div>

    <div
      v-if="!hasTitles || !hasIssues || !hasCoverPhoto"
      class="d-flex justify-center"
    >
      <h3>You have not completed the required steps to begin a draft.</h3>
    </div>
    <v-divider class="my-1"></v-divider>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    hasTitles() {
      return this.$store.getters["currentDraft/hasTitles"];
    },
    hasIssues() {
      return this.$store.getters["currentDraft/hasIssues"];
    },
    hasCoverPhoto() {
      return this.$store.getters["currentDraft/hasCoverPhoto"];
    }
  }
};
</script>

<style scoped></style>
