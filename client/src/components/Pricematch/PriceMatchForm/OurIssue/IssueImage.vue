<template>
  <v-img
    class="ma-1"
    :key="makeImageUrl"
    :src="makeImageUrl"
    max-width="180"
    contain
  ></v-img>
</template>

<script>
import settings from "@/util/settings.js";
export default {
  props: {
    item: [Boolean, Object],
    onClick: [Function]
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
