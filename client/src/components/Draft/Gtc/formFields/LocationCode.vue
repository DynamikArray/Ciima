<template>
  <div>
    <div class="heading mb-1">Location / SKU :</div>
    <v-text-field
      autocomplete="off"
      ref="locationCode"
      dense
      :value="value"
      id="gtcLocationCode"
      @input="handleInputLocationCode"
      name="locationCode"
      outlined
      label="Location"
      hint="Location code for the item"
      counter
      :rules="rules"
      validate-on-blur
      @blur="blur"
      :error-messages="errorMessages"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    rules: {
      type: [Array],
      default: () => []
    },
    value: [String],
    errorMessages: {
      type: [Array],
      default: () => []
    },
    blur: [Function]
  },
  data: () => ({}),
  methods: {
    handleInputLocationCode(val) {
      const locationCode = val.toUpperCase();
      this.$emit("update", { locationCode });
    }
  }
};
</script>

<style scoped></style>
