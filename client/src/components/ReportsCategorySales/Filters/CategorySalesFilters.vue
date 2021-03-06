<template>
  <div class="d-flex justify-space-betwen align-center w-100">
    <h1 class="mr-auto">{{ categoryName }}</h1>
    <DateFilter class="mt-0 mx-2" fieldName="startDate" fieldLabel="Start Date" :fieldValue="startDate" :getData="getData" />
    <DateFilter class="mt-0 mx-2" fieldName="endDate" fieldLabel="End Date" :fieldValue="endDate" :getData="getData" />
    <CategoryNameDropdown fieldName="categoryName" fieldLabel="Category" :fieldValue="categoryName" :getData="getData" />
  </div>
</template>

<script>
import DateFilter from "./DateFilter";
import CategoryNameDropdown from "./CategoryNameDropdown";

export default {
  props: {
    startDate: [String],
    endDate: [String],
    loading: [Boolean],
    getData: [Function],
    categoryName: [String]
  },
  components: {
    DateFilter,
    CategoryNameDropdown
  },
  methods: {}
};
</script>

<style scoped></style>
