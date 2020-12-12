<template>
  <div :class="`d-flex flex-wrap justify-${align} align-end mr-4 w-100`">
    <div
      class="d-flex flex-column justify-end align-center align-self-stretch mr-auto"
    >
      <h1 class="my-0 mr-auto">Drafts:</h1>
    </div>

    <DateChooser
      class="mt-1"
      fieldName="createdDate"
      fieldLabel="Date"
      :getData="getData"
    />

    <DraftStatusDropdown
      :draftStatus="draftStatus"
      :getData="getData"
      class="mx-3"
    />

    <DraftTypeDropdown :draftType="draftType" :getData="getData" class="mx-3" />

    <UserListDropdown
      :userId="userId"
      :getData="getData"
      :updateParam="updateParam"
    />

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
import DateChooser from "./DatePicker";
import UserListDropdown from "@/components/Datatable/Filters/UserListDropdown";

export default {
  props: {
    align: {
      type: [String],
      default: "space-between"
    },
    getData: {
      type: [Function]
    },
    updateParam: {
      type: [Function],
      default: () => ({})
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
    },
    userId: {
      type: [String, Number],
      default: "ALL"
    }
  },
  components: {
    UserListDropdown,
    DateChooser,
    DraftStatusDropdown,
    DraftTypeDropdown,
    DraftSearchForm
  }
};
</script>

<style scoped></style>
