<template>
  <div>
    <v-text-field
      autocomplete="off"
      dense
      autofocus
      :value="value"
      id="locationCode"
      @input="input"
      validate-on-blur
      name="locationCode"
      outlined
      label="Location"
      hint="Location code for the item"
      :rules="rules"
      counter
      @blur="blur"
      :error-messages="errorMessages"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: [Boolean, String],
    input: [Function],
    rules: [Boolean, Array],
    blur: [Function],
    errorMessages: [Array]
  }
};
</script>

<style scoped></style>
