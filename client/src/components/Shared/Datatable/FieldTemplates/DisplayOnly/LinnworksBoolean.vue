<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div
      class=""
      :key="`transition_linnworks_boolean_${keyString}`"
      :class="fontClass"
    >
      <v-icon
        class="textShadow"
        :color="evaluateAsBoolean ? 'success' : 'primary'"
        >{{ iconType }}</v-icon
      >
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
      type: [String, Boolean, Number]
    },
    fontClass: {
      type: [String],
      default: "body-2"
    },
    activeIcon: {
      type: [String],
      default: "fa fa-check-circle"
    },
    inActiveIcon: {
      type: [String],
      default: "fa fa-ban"
    }
  },
  computed: {
    evaluateAsBoolean() {
      if (typeof this.value === "string") {
        if (this.value.toUpperCase() === "TRUE") return true;
        if (this.value.toUpperCase() === "FALSE") return false;
      }

      if (typeof this.value === "boolean") {
        return this.value;
      }

      if (typeof this.value === "number") {
        return Boolean(this.value);
      }
      return false;
    },
    iconType() {
      if (this.evaluateAsBoolean) return this.activeIcon;
      return this.inActiveIcon;
    }
  }
};
</script>

<style scoped></style>
