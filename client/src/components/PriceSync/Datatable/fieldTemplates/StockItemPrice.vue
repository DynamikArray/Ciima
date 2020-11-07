<template>
  <div>
    <v-slide-x-reverse-transition mode="out-in">
      <div class="body-1" :key="`${itemId}-${price}`">
        {{ price | currency }}
      </div>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
export default {
  props: {
    itemId: {
      type: [String],
      default: "itemId-12345-"
    },
    price: {
      type: [Number, String],
      default: ""
    }
  }
};
</script>

<style scoped></style>
