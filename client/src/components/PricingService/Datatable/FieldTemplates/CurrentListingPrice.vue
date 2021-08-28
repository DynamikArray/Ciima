<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="" :key="`transition_pricefield_${keyString}`" :class="fontClass">
      <div>
        {{ value | currency }}
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  name: "CurrentListingPrice",
  props: {
    keyString: {
      type: [String]
    },
    value: {
      type: [String, Number]
    },
    fontClass: {
      type: [String],
      default: "body-2"
    }
  }
};
</script>

<style scoped></style>
