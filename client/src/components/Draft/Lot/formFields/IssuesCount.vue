<template>
  <div class="d-flex justify-start align-center">
    <v-text-field
      dense
      :value="value"
      id="issuesCount"
      @input="handleInputIssuesCount"
      name="issuesCount"
      outlined
      label="Issues Count"
      hint="Number of Issues"
      :rules="rules"
      type="number"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: [String],
    rules: [Array],
    updateData: [Function]
  },
  methods: {
    handleInputIssuesCount(val) {
      this.updateData("issuesCount", val);
    }
  }
};
</script>

<style scoped></style>
