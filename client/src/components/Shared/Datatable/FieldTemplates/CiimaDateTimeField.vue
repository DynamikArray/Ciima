<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="caption" :key="`transition_${itemId}`">
      {{ value | dateTime }}
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    itemId: {
      type: [Number, String]
    },
    value: {
      type: [String]
    }
  }
};
</script>

<style scoped></style>
