<template>
  <v-img
    class="my-1 mx-3"
    :key="item.images.fullsize"
    :src="item.images.fullsize"
    max-width="200"
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
