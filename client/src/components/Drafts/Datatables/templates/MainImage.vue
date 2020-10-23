<template>
  <div class="d-flex justify-start align-center mr-2">
    <div
      v-if="mainImageUrl !== 'false'"
      class="mx-auto text-center grey darken-4"
      style="min-width:140px;"
    >
      <ImagesModal :mainImageUrl="mainImageUrl" :otherImages="otherImages" />
    </div>
    <div v-else>
      <v-icon>fa-exclamation-triangle</v-icon>
    </div>
  </div>
</template>

<script>
import ImagesModal from "@/components/Images/ImagesModal/ImagesModal";
import ImagesHoverOver from "@/components/Images/ImageHoverOver";

export default {
  props: {
    item: [Object]
  },
  components: {
    ImagesModal,
    ImagesHoverOver
  },
  computed: {
    mainImageUrl() {
      return this.item.main_image;
    },
    otherImages() {
      if (this.item.draftType === "singles") return false;
      return this.item.other_images;
    }
  }
};
</script>

<style scoped></style>
