<template>
  <v-img
    v-if="imageUrl"
    :src="makeImageUrl"
    :key="makeImageUrl"
    max-height="100"
    min-height="100"
    width="100"
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
