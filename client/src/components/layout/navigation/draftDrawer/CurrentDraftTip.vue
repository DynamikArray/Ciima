<template>
  <div class="text-center">
    <v-divider class="my-3"></v-divider>
    <v-card elevation="10" outlined class="grey darken-4">
      <v-card-text>
        <div class="d-flex flex-row flex-wrap ">
          <div class="d-flex">
            <div class="subtitle-1 text-left">
              <p class="mx-4">
                Add all your issues along with the created Product photo and
                then continue to the Draft Details section.
              </p>

              <p class="mx-4">
                In the Draft Details section you will be able to complete all
                required fields needed for both Linnworks Inventory and inturn
                Ebay Listings.
              </p>
            </div>
            <div class="d-flex justify-center align-end ml-5">
              <v-btn color="success" @click="showDraftDetails()"
                ><v-icon class="mr-2">fa-arrow-alt-circle-right</v-icon> Draft
                Details
              </v-btn>
            </div>
          </div>
          <div class="d-flex "></div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    btnAction: [Function]
  },
  methods: {
    showDraftDetails() {
      const tabIndex = 1;
      this.btnAction(tabIndex);
    }
  }
};
</script>

<style scoped></style>
