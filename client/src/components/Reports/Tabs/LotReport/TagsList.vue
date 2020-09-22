<template>
  <div class="d-flex flex-wrap align-center justify-start">
    <div
      v-for="tag in tags"
      class="d-flex flex-wrap align-center grey darken-2 mx-2 my-1 px-1"
      style="border-radius:5px;"
    >
      <div class="mx-1 body-2">{{ tag.tag }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: [Array, Boolean]
  }
};
</script>

<style scoped></style>
