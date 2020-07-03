<template>
  <div class="d-flex align-baseline grey darken-4">
    <UpcField />

    <div class="d-flex">
      <p class="mt-2 IssueTopLabel" style="minWidth:80px">Filter Issue #</p>
      <div class="d-flex flex-shrink mx-1 ">
        <v-text-field
          autocomplete="off"
          style="minWidth: 80px; maxWidth: 80px"
          class="pt-0"
          :value="filterString"
          @input="updateFilter"
          prepend-icon="fa fa-filter"
          label=""
          single-line
          hide-details
        ></v-text-field>
      </div>
    </div>

    <div class="d-flex justify-center flex-wrap">
      <v-data-footer
        :pagination="pagination"
        :options="options"
        @update:options="updateOptions"
        :items-per-page-options="footerProps['items-per-page-options']"
        items-per-page-text="Per Page:"
      />
    </div>
  </div>
</template>

<script>
import UpcField from "./UpcField";

export default {
  components: {
    UpcField
  },
  props: {
    filterString: [String],
    pagination: [Boolean, Object],
    options: [Boolean, Object],
    footerProps: [Boolean, Object],
    updateFilter: [Function],
    updateOptions: [Function]
  }
};
</script>

<style>
.IssueTopLabel {
  font-size: 12px;
}
</style>
