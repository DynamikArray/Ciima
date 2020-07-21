<template>
  <div class="d-flex justify-center align-self-stretch align-center">
    <div class="d-flex w-100 justify-center align-center">
      <SelectedTitle
        :blnOurs="true"
        :title="ourSelectedTitle.title"
        :publisher="ourSelectedTitle.publisher"
        :years="ourSelectedTitle.years"
        :issueCount="ourSelectedTitle.issueCount"
      />
    </div>
    <div class="d-flex w-100 justify-center align-center">
      <SelectedTitle
        :blnTheirs="true"
        :title="theirSelectedTitle.title"
        :publisher="theirSelectedTitle.publisher"
        :years="theirSelectedTitle.year"
        :issueCount="theirSelectedTitle.issue"
      />
    </div>
  </div>
</template>

<script>
import SelectedTitle from "./SelectedTitle";
export default {
  props: {
    ourSelectedTitle: [Boolean, Object],
    theirSelectedTitle: [Boolean, Object]
  },
  components: {
    SelectedTitle
  }
};
</script>

<style scoped></style>
