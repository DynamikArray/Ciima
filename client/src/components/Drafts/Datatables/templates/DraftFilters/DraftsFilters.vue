<template>
  <div :class="`d-flex justify-${align} align-center mr-4 w-100`">
    <h2 class="my-0 mr-auto">Drafts:</h2>

    <DraftStatusDropdown
      :draftStatus="draftStatus"
      :getData="getData"
      class="mx-3"
    />

    <DraftTypeDropdown :draftType="draftType" :getData="getData" class="mx-3" />
    <DraftSearchForm
      :getData="getData"
      :searchString="searchString"
      class="ml-3"
    />
  </div>
</template>

<script>
import DraftStatusDropdown from "./DraftStatusDropdown.vue";
import DraftSearchForm from "./DraftSearchForm";
import DraftTypeDropdown from "./DraftTypeDropdown";

export default {
  props: {
    align: {
      type: [String],
      default: "space-between"
    },
    getData: {
      type: [Function]
    },
    draftStatus: {
      type: [String],
      default: "open"
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
    DraftStatusDropdown,
    DraftTypeDropdown,
    DraftSearchForm
  }
};
</script>

<style scoped></style>
