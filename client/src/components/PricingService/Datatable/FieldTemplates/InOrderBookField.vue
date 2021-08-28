<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div :class="fontclass" :key="`transition_${item.pkStockItemID}`">
      {{ item[fieldName] }}
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  name: "InOrderBookField",
  props: {
    item: {
      type: [Object]
    },
    fieldName: {
      type: [String]
    },
    fontclass: {
      type: [String]
    }
  }
};
</script>

<style scoped></style>
