<template>
  <div>
    <div class="heading mb-1">Publisher:</div>
    <v-text-field
      autocomplete="off"
      dense
      :value="value"
      name="publisher"
      outlined
      label="Publisher"
      hint="Publisher of the issue(s)"
      counter
      @input="handlePublisherInput"
      :rules="rules"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: { String },
    rules: {
      type: [Array],
      default: () => []
    }
  },
  data: () => ({}),
  methods: {
    handlePublisherInput(publisher) {
      this.$emit("update", { publisher });
    }
  }
};
</script>
<style scoped></style>
