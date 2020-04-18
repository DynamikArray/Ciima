<template>
  <div
    id="locationCodeWrapper"
    class="d-flex justify-start align-center w-100 my-2"
  >
    <div
      v-if="label"
      class="d-flex justify-start align-center"
      style="min-width:75px"
    >
      <span class="overline mr-2">Location:</span>
    </div>
    <div class="d-flex justify-start align-center">
      <span class="locationCodeSpan subtitle-2  grey darken-4 py-1 px-2">{{
        item.locationCode
      }}</span>
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
#locationCodeWrapper {
  font-size: 90%;
}

#locationCodeWrapper .subtitle-1 {
  line-height: 1.4em;
}

#locationCodeWrapper .locationCodeSpan {
  border-radius: 12px;
}
</style>
