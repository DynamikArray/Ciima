<template>
  <v-img
    v-if="thumbnail"
    :key="thumbnail"
    :src="thumbnail"
    max-height="100"
    min-height="100"
    width="100"
    contain
    @click="onClick(fullsize)"
    class="hover"
  ></v-img>
</template>

<script>
import settings from "@/util/settings.js";
export default {
  props: {
    thumbnail: [Boolean, String],
    fullsize: [Boolean, String],
    onClick: [Function]
  },
  components: {}
};
</script>

<style scoped></style>
