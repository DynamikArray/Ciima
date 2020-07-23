<template>
  <v-img
    v-if="thumbnail"
    :key="thumbnail"
    :src="thumbnail"
    max-height="60"
    min-height="60"
    width="60"
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
