<template>
  <div class="d-flex justify-space-between">
    <div class="d-flex align-center justify-start">
      <h3 class="my-0">Audit Log</h3>
    </div>
    <div class="d-flex justify-space-between">
      <div class="align-center ml-4">
        <UserListDropdown
          :userId="userId"
          :getData="getData"
          :updateParam="updateParam"
        ></UserListDropdown>
      </div>
      <div class="align-center mx-4">
        <ResourceTypeDropDown
          :resourceType="resourceType"
          :getData="getData"
          :updateParam="updateParam"
        ></ResourceTypeDropDown>
      </div>
      <div class="align-center ml-4">
        <ActionDropdown
          :actionType="actionType"
          :getData="getData"
          :updateParam="updateParam"
        ></ActionDropdown>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceTypeDropDown from "./ResourceTypeDropDown";
import ActionDropdown from "./ActionDropdown";
import UserListDropdown from "./UserListDropdown";

export default {
  props: {
    actionType: [String],
    resourceType: [String],
    userId: [String, Number],
    getData: [Function],
    updateParam: [Function]
  },
  components: {
    ActionDropdown,
    ResourceTypeDropDown,
    UserListDropdown
  }
};
</script>

<style scoped></style>
