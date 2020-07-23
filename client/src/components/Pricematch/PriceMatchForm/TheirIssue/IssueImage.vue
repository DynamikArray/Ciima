<template>
  <v-img
    class="my-1 mx-3 hover"
    :key="item.images.thumbnail"
    :src="item.images.fullsize"
    max-width="200"
    contain
    @click="onClick(item.images.fullsize)"
  ></v-img>
</template>

<script>
export default {
  props: {
    item: [Boolean, Object],
    onClick: [Function]
  }
};
</script>

<style scoped></style>
