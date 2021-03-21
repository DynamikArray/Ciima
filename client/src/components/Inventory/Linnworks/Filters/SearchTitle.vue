<template>
  <v-text-field
    name="titleSearch"
    id="titleSearchTextField"
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
    clearable
  >
  </v-text-field>
</template>

<script>
import debounce from "lodash.debounce";

export default {
  name: "searchTitleTextField",
  props: {
    label: [String],
    value: [String]
  },
  data: () => ({
    searchTitle: ""
  }),
  methods: {
    handleKeyDown({ key, keyCode, code }) {
      if (key === "Enter" || code === "Enter" || keyCode === 13) {
        this.$emit("runSearch");
      }
    },
    handleInput(val) {
      this.searchTitle = val;
      this.$emit("updateSearchTitle", this.searchTitle);
    }
  }
};
</script>

<style scoped></style>
