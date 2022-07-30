<template>
  <div class="d-flex align-center flex-column mb-2">
    <div class="d-flex align-center justify-start">
      <h5 class="mt-0 mr-2 mb-1">Search Buyers:</h5>
    </div>

    <div class="d-flex align-center justify-end w-100">
      <v-text-field
        prepend-icon="fa fa-user"
        hide-details
        outlined
        dense
        filled
        clearable
        :value="buyer"
        @input="searchDrafts"
        @click:clear="clearSearch"
        label="Search"
        single-line
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
export default {
  name: "BuyerSearch",
  props: {
    buyer: { type: String, default: "" }
  },
  methods: {
    searchDrafts: debounce(function(buyer) {
      this.$emit("update", { buyer });
      //this.getData({ buyer });
    }, 500),
    clearSearch() {
      this.$emit("update");
      //this.getData({ buyer: "" });
    }
  }
};
</script>

<style scoped></style>
