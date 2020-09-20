<template>
  <div class="d-flex flex-wrap align-center justify-start">
    <div
      v-for="tag in tags"
      class="d-flex flex-wrap align-center grey darken-2 mx-3 my-2 px-2"
      style="border-radius:20px;"
    >
      <h3 class="mx-1">{{ tag.count }}</h3>
      <div class="mx-1">{{ tag.tag }}</div>
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
