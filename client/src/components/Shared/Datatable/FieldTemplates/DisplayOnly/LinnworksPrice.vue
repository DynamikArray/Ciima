<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="" :key="`transition_pricefield_${keyString}`" :class="fontClass">
      <div v-show="!isLotItem">
        {{ value | currency }}
      </div>
      <div v-show="isLotItem">NA</div>
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
      type: [String, Number]
    },
    isLotItem: {
      type: [Boolean],
      default: false
    },
    fontClass: {
      type: [String],
      default: "body-2"
    }
  }
};
</script>

<style scoped></style>
