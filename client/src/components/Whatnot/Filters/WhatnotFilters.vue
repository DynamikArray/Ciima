<template>
  <div class="whatnot-filters d-flex justify-start grey darken-4 pa-2 flex-grow-1">
    <div class="d-flex align-center justify-start mx-3 flex-grow-1">
      <DateFilter
        class="mt-1"
        fieldName="saleDate"
        fieldLabel="Sales Date"
        @update="handleFilterChange"
        :dateSelected="saleDate"
      />
    </div>

    <div class="d-flex align-center justify-start mx-3">
      <BuyerSearch class="mt-1" @update="handleFilterChange" :buyer="buyer" />
    </div>
  </div>
</template>

<script>
import DateFilter from "./DateFilter";
import BuyerSearch from "./BuyerSearch";

export default {
  name: "WhatnotFilters",
  props: {
    buyer: { type: String, default: "" },
    saleDate: { type: String, default: "" }
  },
  components: {
    DateFilter,
    BuyerSearch
  },
  methods: {
    handleFilterChange(filter) {
      this.$emit("update", filter);
    }
  }
};
</script>

<style scoped>
.whatnot-filters {
  border-radius: 8px;
}
</style>
