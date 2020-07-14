<template>
  <v-img
    class="ma-1"
    :key="item.images.thumbnail"
    :src="item.images.thumbnail"
    max-height="160"
    min-height="160"
    max-width="120"
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
