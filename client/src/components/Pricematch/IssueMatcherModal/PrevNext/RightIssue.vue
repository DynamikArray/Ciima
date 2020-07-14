<template>
  <div class="d-flex justify-end align-center w-100">
    <div class="d-flex justify-start align-center mx-3">
      <h5>{{ title }}</h5>
    </div>
    <div class="d-flex justify-start align-center mx-3">
      <h5>{{ issueNumber }}</h5>
    </div>
    <div class="d-flex justify-start align-center mx-2">
      <v-img
        class="ma-1"
        :key="thumbnail"
        :src="thumbnail"
        max-height="80"
        min-height="80"
        max-width="60"
        contain
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: [Boolean, String],
    thumbnail: [Boolean, String],
    issueNumber: [Boolean, Number, String]
  }
};
</script>

<style scoped></style>
