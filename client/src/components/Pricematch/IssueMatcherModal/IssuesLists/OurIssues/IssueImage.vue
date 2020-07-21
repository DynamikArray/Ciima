<template>
  <v-img
    class="ma-1"
    :src="makeImageUrl"
    :key="makeImageUrl"
    min-height="25"
    max-width="25"
    contain
    @click="onClick(makeImageUrl)"
    @error="handleImageError()"
  ></v-img>
</template>

<script>
import settings from "@/util/settings.js";
export default {
  props: {
    item: [Boolean, Object],
    onClick: [Function]
  },
  data: () => ({
    error: false
  }),
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
