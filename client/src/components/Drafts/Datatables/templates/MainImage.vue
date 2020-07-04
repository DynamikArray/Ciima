<template>
  <div class="d-flex justify-start align-center mr-2">
    <div
      v-if="item.main_image !== 'false'"
      class="mx-auto text-center grey darken-4"
      style="min-width:140px;"
    >
      <ImagesHoverOver
        :imageFull="getMainImageFull"
        :imageThumb="getMainImageThumb"
        :maxHeight="100"
        :maxWidth="140"
      />
    </div>
    <div v-else>
      <v-icon>fa-exclamation-triangle</v-icon>
    </div>
  </div>
</template>

<script>
import ImagesHoverOver from "@/components/Images/ImageHoverOver";

export default {
  props: {
    item: [Object]
  },
  components: {
    ImagesHoverOver
  },
  computed: {
    getMainImageFull() {
      if (this.item.main_image.indexOf("upload/") === -1) {
        return this.item.main_image;
      }

      const urlPieces = this.item.main_image.split("upload/");
      const transformation = "upload/w_500,h_600,c_fit,f_auto,fl_lossy,q_auto/";
      urlPieces.splice(1, 0, transformation).join("");
      const finalUrl = urlPieces.join("");
      return finalUrl;
    },
    getMainImageThumb() {
      if (this.item.main_image.indexOf("upload/") === -1) {
        const urlPieces = this.item.main_image.split("/");
        const thumbNail = `https://${urlPieces[2]}/${urlPieces[3]}/${
          urlPieces[4]
        }/tumbnail_${urlPieces[5]}`;
        return thumbNail;
      }

      const urlPieces = this.item.main_image.split("upload/");
      const transformation = "upload/w_160,h_100,c_fit,f_auto,fl_lossy,q_auto/";
      urlPieces.splice(1, 0, transformation).join("");
      const finalUrl = urlPieces.join("");
      return finalUrl;
    }
  }
};
</script>

<style scoped></style>
