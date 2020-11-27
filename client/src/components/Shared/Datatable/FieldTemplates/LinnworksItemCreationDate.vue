<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="caption" :key="`transition_${item.pkStockItemID}`">
      {{ item.ItemCreationDate | dateTime }}
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
