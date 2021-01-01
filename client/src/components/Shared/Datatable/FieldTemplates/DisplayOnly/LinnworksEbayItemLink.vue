<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="" :key="`transition_ebayLink_${keyString}`" :class="fontClass">
      <v-btn icon :href="`https://www.ebay.com/itm/${value}`" target="_blank">
        <v-icon>fa fa-link</v-icon>
      </v-btn>
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
