<template>
  <v-img
    class="ma-1"
    :key="item.images.thumbnail"
    :src="item.images.fullsize"
    max-width="240"
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
