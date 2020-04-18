<template>
  <div id="qtyWrapper" class="d-flex justify-start align-center w-100">
    <div
      v-if="label"
      class="d-flex justify-start align-center"
      style="min-width:75px"
    >
      <span class="overline mr-2">Quantity:</span>
    </div>
    <div class="d-flex justify-center align-center w-100">
      <span class="subtitle-1"> {{ item.quantity }}</span>
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
#qtyWrapper {
  font-size: 90%;
}
#qtyWrapper .subtitle-1 {
  line-height: 1.4em;
}
</style>
