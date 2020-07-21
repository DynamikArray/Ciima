<template>
  <v-img
    :key="item.images.thumbnail"
    :src="item.images.thumbnail"
    max-height="60"
    min-height="60"
    width="60"
    contain
    @click="onClick(item.images.fullsize)"
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
  }
};
</script>

<style scoped></style>
