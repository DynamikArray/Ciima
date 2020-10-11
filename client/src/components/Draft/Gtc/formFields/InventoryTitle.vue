<template>
  <div>
    <div class="heading mb-1">Inventory Title:</div>
    <v-textarea
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
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: [String]
  },
  data: () => ({
    rules: false
  }),
  methods: {
    handleUserInput(inventoryTitle) {
      this.$emit("update", { inventoryTitle });
    }
  }
};
</script>

<style scoped></style>
