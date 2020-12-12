<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div
      class=""
      :key="`transition_category_name_${keyString}`"
      :class="fontClass"
    >
      {{ removePrefix }}
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
      default: "body-1"
    }
  },
  computed: {
    removePrefix() {
      return this.value.replace("EBAY-", "");
    }
  }
};
</script>

<style scoped></style>
