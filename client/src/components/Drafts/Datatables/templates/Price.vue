<template>
  <div id="priceWrapper" class="d-flex justify-start align-center w-100">
    <div
      v-if="label"
      class="d-flex justify-start align-center"
      style="min-width:75px"
    >
      <span class="overline mr-2">Price:</span>
    </div>
    <div class="d-flex justify-center align-center w-100">
      <span class="subtitle-1">{{ Number(item.price) | currency }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: [Boolean],
    item: [Object]
  }
};
</script>

<style scoped>
#priceWrapper {
  font-size: 90%;
}
#priceWrapper .subtitle-1 {
  line-height: 1.4em;
}
</style>
