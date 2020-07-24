<template>
  <v-card class="secondary darken-2">
    <div class="d-flex flex-row w-100">
      <div
        class="d-flex flex-column justify-end align-center borderRight"
        style="width:50%"
      >
        <v-card-title class="pa-1 my-1">{{
          selectedRecord.ourTitle
        }}</v-card-title>
        <v-card-text>
          <div class="d-flex align-center justify-center">
            <div class="d-flex align-center justify-center">
              <OurIssueImage :item="makeOurIssue" :onClick="() => ({})" />
            </div>
          </div>
          <div class="d-flex align-center justify-center">
            <h4>Our Issue</h4>
          </div>
        </v-card-text>
      </div>
      <div
        class="d-flex flex-column justify-start align-center borderLeft"
        style="width:50%"
      >
        <v-card-title class="pa-1 my-1">{{
          selectedRecord.theirTitle
        }}</v-card-title>
        <v-card-text>
          <div class="d-flex align-center justify-center">
            <div class="d-flex align-center justify-center">
              <TheirIssueImage :item="makeTheirIssue" :onClick="() => ({})" />
            </div>
          </div>
          <div class="d-flex align-center justify-center">
            <h4>Their Issue</h4>
          </div>
        </v-card-text>
      </div>
    </div>
    <v-card-title class="borderTop">
      <div class="d-flex align-center justify-start w-100">
        <div class="d-flex align-center justify-center mr-auto">
          <Prices :prices="selectedRecord.ourPricesFromThem" />
        </div>
        <div class="d-flex align-center justify-center flex-column">
          <h6>Created: {{ selectedRecord.dateCreated | date }}</h6>
          <h6>Updated: {{ selectedRecord.dateUpdated | date }}</h6>
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import OurIssueImage from "../OurIssue/IssueImage";
import TheirIssueImage from "../TheirIssue/IssueImage";
import Prices from "../Templates/Prices";

export default {
  props: {
    selectedRecord: [Boolean, Object]
  },
  components: {
    OurIssueImage,
    TheirIssueImage,
    Prices
  },
  computed: {
    makeOurIssue() {
      return { imageUrl: this.selectedRecord.ourImageUrl };
    },
    makeTheirIssue() {
      return {
        images: {
          thumbnail: this.selectedRecord.theirImageThumbnail,
          fullsize: this.selectedRecord.theirImageFullsize
        }
      };
    }
  },
  methods: {}
};
</script>

<style scoped></style>
