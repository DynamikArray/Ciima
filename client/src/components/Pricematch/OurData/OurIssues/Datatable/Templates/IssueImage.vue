<template>
  <v-img
    :src="makeImageUrl"
    :key="makeImageUrl"
    max-height="60"
    min-height="60"
    width="60"
    contain
    @click="onClick(makeImageUrl)"
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
  components: {
    ImageHoverOver
  },
  computed: {
    makeImageUrl() {
      const { item } = this;
      return `${settings.MEDIA_URL}${item.imageUrl}`;
    }
  }
};
</script>

<style scoped></style>
