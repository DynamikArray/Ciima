<template>
  <div class="d-flex justify-center align-center w-100">
    <div class="d-flex w-100 align-end">
      <div class="mx-2 my-2">
        <v-btn small color="grey darken-3 pa-0 mr-1" style="min-width:36px"
          ><v-icon small>S</v-icon></v-btn
        >
      </div>
      <RightIssue
        v-if="ourIssue"
        :title="ourIssue.title"
        :thumbnail="makeOurImageUrl(ourIssue.imageUrl)"
        :issueNumber="ourIssue.fullIssue"
      />
    </div>
    <div class="d-flex justify-center align-center" style="min-width:180px">
      <h4>NEXT ISSUES</h4>
    </div>
    <div class="d-flex w-100 align-end">
      <LeftIssue
        v-if="theirIssue"
        :title="theirIssue.title"
        :thumbnail="theirIssue.images.thumbnail"
        :issueNumber="theirIssue.issueNumber"
      />
      <div class="mx-2 my-2">
        <v-btn small color="grey darken-3 pa-0 mr-1" style="min-width:36px"
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
