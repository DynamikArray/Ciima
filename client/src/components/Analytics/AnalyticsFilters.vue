<template>
  <div class="d-flex flex-grow justify-end align-center flex-wrap">
    <div class="d-flex justify-end align-center mx-2">
      <UserListDropdown
        :userId="userId"
        :getData="getData"
        :updateParam="updateParam"
      />
    </div>
    <div class="d-flex justify-end align-center mx-2">
      <DaysDropdown
        :days="days"
        :getData="getData"
        :updateParam="updateParam"
      />
    </div>
  </div>
</template>

<script>
import DaysDropdown from "@/components/Datatable/Filters/DaysDropdown";
import UserListDropdown from "@/components/Datatable/Filters/UserListDropdown";
export default {
  props: {
    days: [Number, Boolean],
    userId: [String, Number, Boolean],
    getData: [Function],
    updateParam: [Function]
  },
  components: {
    DaysDropdown,
    UserListDropdown
  }
};
</script>

<style scoped></style>
