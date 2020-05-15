<template>
  <div :class="`d-flex justify-${align} align-center mt-3 mr-4 w-100`">
    <div class="d-flex justify-end align-center w-100">
      <DraftSearchForm
        :getData="getData"
        :searchString="searchString"
      ></DraftSearchForm>

      <DraftTypeDropdown
        :draftType="draftType"
        :getData="getData"
      ></DraftTypeDropdown>
    </div>
  </div>
</template>

<script>
import DraftSearchForm from "./DraftSearchForm";
import DraftTypeDropdown from "./DraftTypeDropdown";

export default {
  props: {
    align: {
      type: [String],
      default: "space-around"
    },
    getData: {
      type: [Function]
    },
    draftType: {
      type: [String],
      default: ""
    },
    searchString: {
      type: [String],
      default: ""
    }
  },
  components: {
    DraftTypeDropdown,
    DraftSearchForm
  }
};
</script>

<style scoped></style>
