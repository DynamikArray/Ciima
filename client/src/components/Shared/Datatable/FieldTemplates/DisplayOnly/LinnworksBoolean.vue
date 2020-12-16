<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div
      class=""
      :key="`transition_linnworks_boolean_${keyString}`"
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
      type: [String, Boolean]
    },
    fontClass: {
      type: [String],
      default: "body-2"
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
      return false;
    }
  }
};
</script>

<style scoped></style>
