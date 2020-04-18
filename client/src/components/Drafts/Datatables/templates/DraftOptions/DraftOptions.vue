<template>
  <v-row>
    <v-col cols="6" class="d-flex align-center py-0"
      ><h2 class="my-0">Drafts:</h2></v-col
    >
    <v-col cols="6 py-0">
      <DraftStatusDropdown :getData="updateDropdownValue"></DraftStatusDropdown>
    </v-col>
  </v-row>
</template>

<script>
import DraftStatusDropdown from "./DraftStatusDropdown.vue";

export default {
  props: {
    status: [String],
    getData: [Function]
  },
  components: {
    DraftStatusDropdown
  },
  methods: {
    updateDropdownValue({ status }) {
      this.$emit("update:status", status);
      this.getData({ status });
    }
  }
};
</script>

<style scoped></style>
