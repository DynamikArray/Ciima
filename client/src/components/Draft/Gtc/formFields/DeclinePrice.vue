<template>
  <div>
    <div class="heading mb-1">Decline Price:</div>
    <v-text-field
      autocomplete="off"
      dense
      :value="value"
      id="declinePrice"
      @input="handleInput"
      name="declinePrice"
      outlined
      label="Decline Price"
      hint="Decline Price for the item"
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
    handleInput(declinePrice) {
      this.$emit("update", { declinePrice });
    }
  }
};
</script>

<style scoped></style>
