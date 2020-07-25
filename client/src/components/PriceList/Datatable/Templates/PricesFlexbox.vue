<template>
  <div
    class="d-flex flex-wrap justify-start align-center caption"
    style="line-height:1.3em;"
  >
    <div
      v-for="price in prices"
      class="d-flex flex-column aling-center justify-center mx-2"
    >
      <div class="d-flex align-center justify-center">
        {{ price.grade }}
      </div>
      <div class="d-flex align-center justify-center">
        {{ price.price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prices: [Boolean, Array]
  }
};
</script>

<style scoped></style>
