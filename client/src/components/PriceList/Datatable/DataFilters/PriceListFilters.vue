<template>
  <div class="d-flex align-end justify-start">
    <SearchBox :getData="getData" />

    <DatePicker
      :getData="getData"
      fieldName="dateCreated"
      fieldLabel="Date Created"
    />

    <DatePicker
      :getData="getData"
      fieldName="dateUpdated"
      fieldLabel="Date Updated"
    />
  </div>
</template>

<script>
import DatePicker from "./DatePicker";
import SearchBox from "./SearchBox";

export default {
  props: {
    getData: [Function]
  },
  components: {
    DatePicker,
    SearchBox
  }
};
</script>

<style scoped></style>
