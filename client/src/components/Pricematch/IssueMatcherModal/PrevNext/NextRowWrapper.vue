<template>
  <div class="d-flex justify-center align-center w-100">
    <div class="d-flex justify-end w-100 ">
      <div class="d-flex mx-2 align-self-stretch align-center mb-2">
        <v-btn small color="grey darken-2 pa-0" style="min-width:36px"
          ><v-icon small>S</v-icon></v-btn
        >
      </div>
      <RightIssue
        v-if="ourIssue"
        :title="ourIssue.title"
        :thumbnail="makeOurImageUrl(ourIssue.imageUrl)"
        :issueNumber="ourIssue.fullIssue"
      />
      <div class="d-flex justify-center align-center w-100" v-else>
        <h5>No results</h5>
      </div>
    </div>

    <div class="d-flex justify-center align-center" style="min-width:180px">
      <h6>
        <v-icon small class="mr-1">fa fa-arrow-left</v-icon>Next Issues<v-icon
          small
          class="ml-1"
          >fa fa-arrow-right</v-icon
        >
      </h6>
    </div>

    <div class="d-flex justify-end w-100">
      <LeftIssue
        v-if="theirIssue"
        :title="theirIssue.title"
        :thumbnail="theirIssue.images.thumbnail"
        :issueNumber="theirIssue.issueNumber"
      />
      <div class="d-flex justify-center align-center w-100" v-else>
        <h5>No results</h5>
      </div>
      <div class="d-flex mx-2 align-self-stretch align-center mb-2">
        <v-btn small color="grey darken-2 pa-0" style="min-width:36px"
          ><v-icon small>fa fa-arrow-down</v-icon></v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import LeftIssue from "./LeftIssue";
import RightIssue from "./RightIssue";
import settings from "@/util/settings.js";
export default {
  props: {
    ourIssue: [Boolean, Object],
    theirIssue: [Boolean, Object]
  },
  components: {
    LeftIssue,
    RightIssue
  },
  methods: {
    makeOurImageUrl(imageUrl) {
      return `${settings.MEDIA_URL}/${imageUrl}`;
    }
  }
};
</script>

<style scoped></style>
