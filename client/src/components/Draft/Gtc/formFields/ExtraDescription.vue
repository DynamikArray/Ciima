<template>
  <div>
    <div class="heading mb-1">Extra Description:</div>
    <v-textarea
      :value="value"
      auto-grow
      outlined
      label="Extra Description Information"
      hint="Will be added underneath the title in the description of the ebay listing"
      :rules="rules"
      @change="handleChange"
    >
    </v-textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: [String],
    rules: {
      type: [Array],
      default: () => []
    }
  },
  methods: {
    handleChange(extraDescription) {
      this.$emit("update", { extraDescription });
    }
  }
};
</script>

<style scoped></style>
