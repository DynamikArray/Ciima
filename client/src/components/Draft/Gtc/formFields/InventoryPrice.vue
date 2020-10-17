<template>
  <div>
    <div class="heading mb-1">Price:</div>
    <v-text-field
      autocomplete="off"
      dense
      :value="value"
      id="gtcPrice"
      @input="handleInputPrice"
      name="price"
      outlined
      label="Price"
      hint="Listing Price for the item"
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
    handleInputPrice(price) {
      this.$emit("update", { price });
    }
  }
};
</script>

<style scoped></style>
