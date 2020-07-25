<template>
  <v-text-field
    autocomplete="off"
    dense
    :value="value"
    @input="input"
    id="grade"
    name="grade"
    outlined
    label="Grade"
    hint="Grade of the product"
    :rules="rules"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: [String],
    input: [Function],
    rules: [Boolean, Array]
  }
};
</script>

<style scoped></style>
