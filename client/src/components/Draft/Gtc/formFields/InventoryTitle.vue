<template>
  <div>
    <div class="heading mb-1">Inventory Title:</div>
    <v-textarea
      autofocus
      rows="2"
      dense
      :value="value"
      id="GTC-inventoryTitle"
      name="inventoryTitle"
      label="Title"
      hint="Listing Title"
      outlined
      counter="80"
      @input="handleUserInput"
      :rules="rules"
    ></v-textarea>
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
  data: () => ({}),
  methods: {
    handleUserInput(inventoryTitle) {
      this.$emit("update", { inventoryTitle });
    }
  }
};
</script>

<style scoped></style>
