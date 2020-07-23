<template>
  <v-img
    v-if="imageUrl"
    :src="makeImageUrl"
    :key="makeImageUrl"
    max-height="58"
    min-height="58"
    width="60"
    contain
    @click="onClick(makeImageUrl)"
    @error="handleImageError()"
    class="hover"
  ></v-img>
</template>

<script>
import settings from "@/util/settings.js";
export default {
  props: {
    imageUrl: [Boolean, String],
    onClick: [Function]
  },
  data: () => ({
    error: false
  }),
  components: {},
  computed: {
    makeImageUrl() {
      if (!this.error) {
        const { imageUrl } = this;
        return `${settings.MEDIA_URL}${imageUrl}`;
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
