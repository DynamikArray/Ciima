<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div
      class=""
      :key="`transition_bin_rack_number_${keyString}`"
      :class="fontClass"
    >
      {{ value }}
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    keyString: {
      type: [String]
    },
    value: {
      type: [String]
    },
    fontClass: {
      type: [String],
      default: "body-2"
    }
  }
};
</script>

<style scoped></style>
