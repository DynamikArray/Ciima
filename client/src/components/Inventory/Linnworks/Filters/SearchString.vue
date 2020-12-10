<template>
  <v-text-field
    outlined
    autocomplete="off"
    autofocus
    dense
    hide-details
    persistent-hint
    :value="value"
    :label="label"
    prepend-inner-icon="fa-search"
    @input="handleInput"
    @keydown="handleKeyDown"
    full-width
  >
  </v-text-field>
</template>

<script>
import debounce from "lodash.debounce";

export default {
  props: {
    label: [String],
    value: [String]
  },
  data: () => ({
    searchString: ""
  }),
  methods: {
    handleKeyDown({ key, keyCode, code }) {
      if (key === "Enter" || code === "Enter" || keyCode === 13) {
        this.$emit("runSearch");
      }
    },
    handleInput(val) {
      this.searchString = val;
      this.$emit("updateSearchString", this.searchString);
    }
  }
};
</script>

<style scoped></style>
