<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="caption" :key="`transition_${item.pkStockItemID}`">
      {{ lastPricedDateTime | dateTime }}
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    item: {
      type: [Object]
    }
  },
  computed: {
    lastPricedDateTime() {
      return this.item.LastPriced + " UTC";
    }
  }
};
</script>

<style scoped></style>
