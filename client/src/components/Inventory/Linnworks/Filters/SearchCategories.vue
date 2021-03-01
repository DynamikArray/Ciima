<template>
  <div class="d-flex align-center justify-center mt-3">
    <div class="title">Categories:</div>
    <div class="d-flex">
      <v-checkbox
        v-for="cat in CATEGORIES"
        v-model="searchCategories"
        :key="cat.value"
        :value="cat.value"
        :label="cat.name"
        class="ma-0 py-0 px-3"
        dense
        hide-details
        color="primary"
      ></v-checkbox>
    </div>
  </div>
</template>

<script>
const CATEGORIES = [
  {
    name: "Adult",
    value: "EBAY-ADULT"
  },
  {
    name: "Default",
    value: "Default"
  },
  {
    name: "GTCs",
    value: "EBAY-GTCS"
  },
  {
    name: "Lots",
    value: "EBAY-LOTS"
  },
  {
    name: "Sets",
    value: "EBAY-SETS"
  },
  {
    name: "Singles",
    value: "EBAY-SINGLES"
  }
];

export default {
  watch: {
    searchCategories(val) {
      this.$emit("updateSearchCategories", val);
    }
  },
  data: () => ({
    CATEGORIES,
    searchCategories: ["EBAY-SETS", "EBAY-LOTS", "EBAY-SINGLES", "EBAY-GTCS"]
  })
};
</script>

<style scoped></style>
