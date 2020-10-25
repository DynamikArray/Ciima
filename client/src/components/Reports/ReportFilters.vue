<template>
  <div class="d-flex justify-space-betwen align-center w-100">
    <h1 class="mr-auto">{{ categoryName }}</h1>
    <DateFilter
      class="mt-0 mx-2"
      fieldName="startDate"
      fieldLabel="Start Date"
      :fieldValue="startDate"
      :getData="getData"
    />
    <DateFilter
      class="mt-0 mx-2"
      fieldName="endDate"
      fieldLabel="End Date"
      :fieldValue="endDate"
      :getData="getData"
    />
    <div class="align-center justify-center mt-3 ml-3">
      <v-btn color="primary" @click="printGrid"
        ><v-icon class="mr-2">fa fa-print</v-icon>Print</v-btn
      >
    </div>
  </div>
</template>

<script>
import DateFilter from "./Filters/DateFilter";

export default {
  props: {
    startDate: [String],
    endDate: [String],
    loading: [Boolean],
    getData: [Function],
    categoryName: [String]
  },
  components: {
    DateFilter
  },
  methods: {
    printGrid() {
      this.$emit("printGrid");
    }
  }
};
</script>

<style scoped></style>
