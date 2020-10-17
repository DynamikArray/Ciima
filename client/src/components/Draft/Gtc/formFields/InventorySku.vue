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
    value: [String]
  },
  data: () => ({}),
  methods: {
    handleInputLocationCode(locationCode) {
      this.$emit("update", { locationCode });
    }
  }
};
</script>

<style scoped></style>
