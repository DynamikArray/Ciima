<template>
  <div class="w-100">
    <v-text-field
      id="locationSearch"
      outlined
      autocomplete="off"
      autofocus
      dense
      hide-details
      persistent-hint
      :value="value"
      :label="label"
      prepend-inner-icon="fa-cube"
      @input="handleInput"
      @keydown="handleKeyDown"
      full-width
      clearable
    >
    </v-text-field>
  </div>
</template>

<script>
import debounce from "lodash.debounce";

export default {
  name: "searchLocationTextField",
  props: {
    label: [String],
    value: [String]
  },
  data: () => ({
    searchLocation: ""
  }),
  methods: {
    handleKeyDown({ key, keyCode, code }) {
      if (key === "Enter" || code === "Enter" || keyCode === 13) {
        this.$emit("runSearch");
      }
    },
    handleInput(val) {
      this.searchLocation = val;
      this.$emit("updateSearchLocation", this.searchLocation);
    }
  }
};
</script>

<style scoped></style>
