<template>
  <v-img
    class="ma-1"
    :key="images.thumbnail"
    :src="images.fullsize"
    min-height="25"
    max-width="25"
    contain
  ></v-img>
</template>

<script>
export default {
  props: {
    images: [Boolean, Object]
  }
};
</script>

<style scoped></style>
