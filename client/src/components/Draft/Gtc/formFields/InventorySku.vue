<template>
  <div>
    <div class="heading mb-1">Location / SKU :</div>
    <v-text-field
      autocomplete="off"
      autofocus
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
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
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
