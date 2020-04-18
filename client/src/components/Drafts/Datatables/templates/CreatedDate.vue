<template>
  <div id="createdDateWrapper" class="d-flex align-center">
    <div class="createdDateValue overline text-center">
      {{ item.createdDate | dateTime }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: [Object]
  }
};
</script>

<style scoped>
#createdDateWrapper .createdDateValue {
  line-height: 1.3em;
}
</style>
