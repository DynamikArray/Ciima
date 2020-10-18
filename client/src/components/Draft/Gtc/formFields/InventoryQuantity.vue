<template>
  <div>
    <div class="heading mb-1" v-text="label"></div>
    <v-text-field
      autocomplete="off"
      dense
      :value="value"
      name="quantity"
      id="quantity"
      outlined
      label="Qty"
      hint="Quantity"
      @input="handleQuantityInput"
      :rules="rules"
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
    label: {
      type: [String],
      default: "Quantity"
    },
    value: {
      type: [String]
    }
  },
  data: () => ({}),
  methods: {
    handleQuantityInput(quantity) {
      this.$emit("update", { quantity });
    }
  }
};
</script>

<style scoped></style>
