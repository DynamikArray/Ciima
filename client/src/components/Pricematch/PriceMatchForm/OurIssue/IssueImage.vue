<template>
  <v-img
    class="my-1 mx-3 hover"
    :key="makeImageUrl"
    :src="makeImageUrl"
    max-width="200"
    contain
    @click="onClick(makeImageUrl)"
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
