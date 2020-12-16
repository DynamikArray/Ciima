<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div
      class=""
      :key="`transition_linnworks_time_${keyString}`"
      :class="fontClass"
    >
      {{ value | dateTime }}
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
