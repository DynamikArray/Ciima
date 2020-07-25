<template>
  <div class="d-flex align-end justify-start">
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

export default {
  props: {
    getData: [Function]
  },
  components: {
    DatePicker
  }
};
</script>

<style scoped></style>
