<template>
  <div class="d-flex justify-end align-center">
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
    <CategoryNameDropdown
      class="mt-0 mx-2"
      fieldName="categoryName"
      fieldLabel="Lot Type"
      :fieldValue="categoryName"
      :getData="getData"
    />
  </div>
</template>

<script>
import DateFilter from "./Filters/DateFilter";
import CategoryNameDropdown from "./Filters/CategoryNameDropdown";

export default {
  props: {
    startDate: [String],
    endDate: [String],
    categoryName: [String],
    loading: [Boolean],
    getData: [Function]
  },
  components: {
    DateFilter,
    CategoryNameDropdown
  }
};
</script>

<style scoped></style>
