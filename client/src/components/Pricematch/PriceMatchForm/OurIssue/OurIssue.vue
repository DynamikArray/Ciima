<template>
  <v-fade-transition mode="out-in">
    <div class="d-flex justify-end align-center w-100" :key="selectedIssue.id">
      <div
        class="d-flex flex-column align-end justify-space-around h-100 w-100"
      >
        <h4 class="my-0">{{ selectedIssue.title }}</h4>
        <h1 class="display-2 my-2">#{{ selectedIssue.fullIssue }}</h1>

        <div v-if="selectedIssue.variation || selectedIssue.comicType" class="">
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

        <div class="d-flex align-center justify-end">
          <Prices
            alignClass="justify-end"
            :prices="selectedIssue.issuePrices || false"
          />
          <IssueMatch :issue="selectedIssue" />
        </div>
      </div>

      <v-dialog v-model="previewImage" max-width="550">
        <v-card color="secondary darken-3" dark class="pt-2">
          <v-card-text>
            <v-img :src="previewImageUrl" max-height="750" contain></v-img>
          </v-card-text>
        </v-card>
      </v-dialog>

      <div class="d-flex ml-3">
        <IssueImage
          :item="selectedIssue"
          :onClick="showFullSizeImage"
        ></IssueImage>
      </div>
    </div>
  </v-fade-transition>
</template>

<script>
import IssueImage from "./IssueImage";
import Prices from "../Templates/Prices";
import IssueMatch from "../IssueMatch/IssueMatch";

export default {
  props: {
    selectedIssue: [Boolean, Object]
  },
  components: {
    IssueImage,
    Prices,
    IssueMatch
  },
  data: () => ({
    previewImageUrl: false,
    previewImage: false
  }),
  methods: {
    showFullSizeImage(image) {
      this.previewImageUrl = image;
      this.previewImage = true;
    }
  }
};
</script>

<style scoped></style>
