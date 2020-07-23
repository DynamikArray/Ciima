<template>
  <v-img
    :src="makeImageUrl"
    :key="makeImageUrl"
    max-height="58"
    min-height="58"
    width="60"
    contain
    @click="onClick(makeImageUrl)"
    @error="handleImageError()"
    class="mt-1 mb-1 hover"
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
    hadleImageError() {
      this.error = true;
    }
  }
};
</script>

<style scoped></style>
