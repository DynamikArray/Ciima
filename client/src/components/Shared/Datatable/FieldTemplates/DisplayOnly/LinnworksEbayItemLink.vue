<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="" :key="`transition_ebayLink_${keyString}`" :class="fontClass">
      <v-btn small :color="btnColor" :icon="asIcon" :href="`https://www.ebay.com/itm/${value}`" target="_blank">
        <v-icon :small="iconSmall" :color="iconColor" :class="iconClass">{{ iconString }}</v-icon>
        <span v-if="iconText" class="ml-2 textShadow">{{ iconText }}</span>
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
    btnColor: {
      type: [String],
      default: "primary"
    },
    value: {
      type: [String]
    },
    fontClass: {
      type: [String],
      default: "body-2"
    },
    asIcon: {
      type: [Boolean],
      default: true
    },
    iconColor: {
      type: [String],
      default: "primary"
    },
    iconClass: {
      type: [String],
      default: "textShadow"
    },
    iconString: {
      type: [String],
      default: "fa fa-external-link-square-alt"
    },
    iconText: {
      type: [Boolean, String],
      default: false
    },
    iconSmall: {
      type: [Boolean],
      default: false
    }
  }
};
</script>

<style scoped></style>
