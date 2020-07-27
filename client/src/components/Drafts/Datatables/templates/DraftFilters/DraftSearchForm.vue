<template>
  <div class="d-flex align-center flex-column mb-2">
    <div class="d-flex align-center justify-start">
      <h5 class="mt-0 mr-2 mb-1">Search Titles or Locations:</h5>
    </div>

    <div class="d-flex align-center justify-end w-100">
      <v-text-field
        hide-details
        outlined
        dense
        filled
        clearable
        :value="searchString"
        @input="searchDrafts"
        @click:clear="clearSearch"
        label="Search"
        single-line
      ></v-text-field>
    </div>
  </div>
</template>

<script>
/*
@change="handleChange"

handleChange(searchString) {
  this.$parent.$emit("update:searchString", searchString);
  this.getData({ searchString });
}

 */
import debounce from "lodash.debounce";
export default {
  props: {
    getData: {
      type: [Function]
    },
    searchString: {
      type: [String],
      default: ""
    }
  },
  methods: {
    searchDrafts: debounce(function(searchString) {
      this.$parent.$emit("update:searchString", searchString);
      this.getData({ searchString });
    }, 500),
    clearSearch() {
      this.$parent.$emit("update:searchString", "");
      this.getData({ searchString: "" });
    }
  }
};
</script>

<style scoped></style>
