<template>
  <v-img
    :src="makeImageUrl"
    :key="makeImageUrl"
    max-height="60"
    min-height="60"
    width="60"
    contain
    @click="onClick(makeImageUrl)"
    @error="handleImageError()"
  ></v-img>
</template>

<script>
import settings from "@/util/settings.js";
import ImageHoverOver from "@/components/Images/ImageHoverOver";
export default {
  props: {
    item: [Boolean, Object],
    onClick: [Function]
  },
  data: () => ({
    error: false
  }),
  components: {
    ImageHoverOver
  },
  computed: {
    makeImageUrl() {
      if (!this.error) {
        const { item } = this;
        return `${settings.MEDIA_URL}${item.imageUrl}`;
      }

      return "/img/thumb-not-found-image.jpg";
    }
  },
  methods: {
    handleImageError() {
      this.error = true;
    }
  }
};
</script>

<style scoped></style>
