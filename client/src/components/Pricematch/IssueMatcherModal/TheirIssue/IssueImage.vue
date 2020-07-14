<template>
  <v-img
    class="ma-1"
    :key="item.images.thumbnail"
    :src="item.images.fullsize"
    max-height="400"
    min-height="400"
    max-width="300"
    contain
  ></v-img>
</template>

<script>
export default {
  props: {
    item: [Boolean, Object]
  }
};
</script>

<style scoped></style>
