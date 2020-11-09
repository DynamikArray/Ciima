<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="body-1" :key="`transition_${item.pkStockItemID}`">
      {{ item.ItemTitle }}
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    item: {
      type: [Object]
    }
  }
};
</script>

<style scoped></style>
