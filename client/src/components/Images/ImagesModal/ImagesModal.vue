<template>
  <v-dialog
    v-model="dialog"
    width="620"
    :scrollable="true"
    overlay-color="grey darken-4"
    overlay-opacity=".7"
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        v-bind="attrs"
        v-on="on"
        :style="`min-height: ${minHeight}px;`"
        class="d-flex justify-center mx-auto pa-1"
      >
        <div class="d-flex align-center justify-center">
          <v-img
            v-if="mainImageUrl"
            :key="makeFileNameKey()"
            :src="mainImageUrl"
            :style="`max-width: ${maxWidth}px; max-height: ${maxHeight}px;`"
            contain
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="blue darken-1"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>
      </div>
    </template>

    <v-card class="">
      <v-card-text class="text-center py-1">
        <MainImage :imageFull="selectedImage" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <OtherImages
          v-if="otherImages"
          :otherImages="allImages"
          @imageSelected="handleImageSelection"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import MainImage from "./MainImage";
import OtherImages from "./OtherImages";

export default {
  props: {
    mainImageUrl: [Boolean, String],
    otherImages: [Boolean, Array]
  },
  created() {
    this.selectedImage = this.mainImageUrl;
  },
  components: {
    MainImage,
    OtherImages
  },
  data: () => ({
    dialog: false,
    selectedImage: false,
    minHeight: 100,
    maxHeight: 100,
    maxWidth: 140
  }),
  computed: {
    allImages() {
      this.otherImages.unshift({ imageUrl: this.mainImageUrl });
      return this.otherImages;
    }
  },
  methods: {
    // TODO: MAKE A THUMBNAIL URL FROM CLOUDINARY SO WE SAVE BANDWIDTH
    handleImageSelection(imageUrl) {
      this.selectedImage = imageUrl;
    },
    //
    makeFileNameKey() {
      const thumb = this.mainImageUrl;
      const path = thumb.split("/").reverse();
      return path[1] || Date.now();
    }
  }
};
</script>

<style scoped></style>
