<template>
  <v-fade-transition mode="out-in">
    <div
      class="d-flex justify-end align-center w-100"
      :key="selectedIssue.issueNumber"
    >
      <div class="d-flex">
        <IssueImage
          :item="selectedIssue"
          :onClick="showFullSizeImage"
        ></IssueImage>
      </div>

      <div
        class="d-flex flex-column align-start justify-space-around h-100 w-100 pr-3"
      >
        <h4 class="my-0">{{ selectedIssue.title }}</h4>
        <h1 class="display-2 my-2">{{ selectedIssue.issueNumber }}</h1>

        <Prices
          v-if="selectedIssue"
          alignClass="justify-start"
          :prices="selectedIssue.prices"
        ></Prices>
      </div>

      <v-dialog v-model="previewImage" max-width="550">
        <v-card color="secondary darken-3" dark class="pt-2">
          <v-card-text>
            <v-img :src="previewImageUrl" max-height="750" contain></v-img>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-fade-transition>
</template>

<script>
import Prices from "../Templates/Prices";
import IssueImage from "./IssueImage";

export default {
  props: {
    selectedIssue: [Boolean, Object]
  },
  components: {
    IssueImage,
    Prices
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
