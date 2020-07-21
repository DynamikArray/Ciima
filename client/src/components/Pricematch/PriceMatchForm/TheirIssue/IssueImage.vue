<template>
  <v-img
    class="ma-1"
    :key="item.images.fullsize"
    :src="item.images.fullsize"
    max-width="180"
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
